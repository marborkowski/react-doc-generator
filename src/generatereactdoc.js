import path from "path";
import { parse, resolver } from "react-docgen";
import { promisify } from "util";
import { readFiles } from "node-dir";

import Colors from "colors";
import pkg from "../package.json";

const readFilesPromise = promisify(readFiles);

const templateData = {
  files: [],
  version: pkg.version
};

export const isDefaultValueTypeString = prop => {
  if (!prop || !prop.type) {
    return null;
  }
  return (
    prop.type.name === "string" && typeof prop.defaultValue.value === "string"
  );
};
export const isInvalidDefaultValue = value =>
  /[^\w\s.&:\-+*,!@%$]+/gim.test(value);
export const getTypeOfProp = (prop) => {
  if(!prop){
    return ''
  }
  if(prop.type){
    return prop.type
  }else if(prop.flowType){
    const typeName = prop.flowType.raw ? prop.flowType.raw : prop.flowType.name
    return {
      name: typeName
    }
  }

}  
export function processProp(prop) {
  const { defaultValue = {} } = prop;
  const isString = isDefaultValueTypeString(prop);
  const isInvalidValue = isInvalidDefaultValue(defaultValue.value);
  const processedType = getTypeOfProp(prop)
  const processedDefaultValue =
    defaultValue && isInvalidValue && isString === false
      ? "See code"
      : defaultValue.value;
  const processedDescription = prop.description
    ? prop.description
        .split("\n")
        .map(text => text.replace(/(^\s+|\s+$)/, ""))
        .map(hasValidValue => hasValidValue)
        .join(" ")
    : "";
    
  return {
    ...prop,
    defaultValue: { ...prop.defaultValue, value: processedDefaultValue },
    description: processedDescription,
    type: processedType,
  };
}
function parseSingleFile(fileContent) {
  const components = parse(
    fileContent,
    resolver.findAllExportedComponentDefinitions
  );
  const componentObjects = components.map(component => {
    const { description, displayName } = component;
    const modifiedTitle =
      description && !displayName
        ? description.match(/^(.*)$/m)[0]
        : displayName;
    let modifiedDescription = null;
    if (description) {
      if (description.split("\n").length > 1) {
        modifiedDescription = description.replace(/[\w\W]+?\n+?/, "");
        modifiedDescription = modifiedDescription.replace(/(\n)/gm, "   \n");
      }
      modifiedDescription = `${modifiedDescription}   \n\n`;
    }
    // validate default values
    const propEntries = Object.entries(component.props);
    const modifiedPropEntries = propEntries.map(([propName,propObject]) => {
        const modifiedProp = processProp(propObject)
        return [propName,modifiedProp]   
    })
    const modife = modifiedPropEntries.reduce((accum,current) => {
        const modifiedAccum = {...accum, [current[0]]: current[1]}
        return modifiedAccum
    },{})
    return {
      ...component,
      title: modifiedTitle,
      description: modifiedDescription,
      props: modife
    };
  });
  return componentObjects;
}
async function generateReactDocs({
  sourceDir,
  extensions = [],
  excludePatterns = [],
  ignoreDirectory = [],
  outputDir
}) {
  const cliOutput = [];
  const inputPath = path.resolve(sourceDir);
  await readFilesPromise(
    inputPath,
    {
      match: new RegExp("\\.(?:" + extensions.join("|") + ")$"),
      exclude: excludePatterns,
      excludeDir: ignoreDirectory
    },
    (err, content, filename, next) => {
      if (err) {
        console.log(err, "error");
        throw err;
      }
      try {
        const components = parseSingleFile(content);
        templateData.files.push({ filename, components });
        cliOutput.push([filename, components.length, Colors.green(`OK.`)]);
      } catch (e) {
        console.error("In error",e);
        cliOutput.push([
          filename,
          0,
          Colors.red(`You have to export at least one valid React Class!`)
        ]);
      }

      next();
    }
  );
  if (templateData.files.length === 0) {
    let allExtensions = extensions.map(ext => {
      return `\`*.${ext}\``;
    });
    console.log(
      `${Colors.bold.yellow("Warning:")} ${Colors.yellow(
        `Could not find any files matching the file type: ${allExtensions.join(
          " OR "
        )}`
      )}\n`
    );
  } else {
    console.log(`${cliOutput.toString()}\n\n`);
  }

  return [templateData,cliOutput];
}
export default generateReactDocs;
