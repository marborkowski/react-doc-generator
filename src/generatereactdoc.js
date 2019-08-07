
import { parse, resolver } from 'react-docgen';
import {promisify} from 'util'
import { readFiles } from 'node-dir';

import Colors from 'colors';
import pkg from '../package.json'

const readFilesPromise =promisify(readFiles)


const templateData = {
    files: [],
    version: pkg.version,
};


export const isDefaultValueTypeString = (prop) => {
    if(!prop|| !prop.type){
        return null
    }
    return prop.type.name === 'string' && typeof prop.defaultValue.value === 'string'
}
export const isInvalidDefaultValue = (value) => (/[^\w\s.&:\-+*,!@%$]+/igm).test(value)
export function processProp(prop){
    const { defaultValue = {} } = prop
    console.log(defaultValue,'deafultValue')
    const isString = isDefaultValueTypeString(prop)
    const isInvalidValue = isInvalidDefaultValue(defaultValue.value);
    console.log(!!defaultValue,isInvalidValue,isString===false)
    const processedDefaultValue =  (defaultValue&&isInvalidValue&& isString===false) ?'See code': prop.defaultValue.value
    const processedDescription = prop.description?  
       prop.description
      .split('\n')
      .map(text => text.replace(/(^\s+|\s+$)/, ''))
      .map(hasValidValue => hasValidValue)
      .join(' '): ''
      console.log(prop,'Prop')
    return {
        ...prop,
        defaultValue: {...prop.defaultValue, value: processedDefaultValue},
        description: processedDescription
    }
}
function parseSingleFile(fileContent){
    const components = parse(fileContent, resolver.findAllExportedComponentDefinitions);
    const componentObjects = components.map(component => {
        if (component.description && !component.displayName) {
            component.title = component.description.match(/^(.*)$/m)[0];
            if (component.description.split('\n').length > 1) {
                component.description = component.description.replace(/[\w\W]+?\n+?/, '');
                component.description = component.description.replace(/(\n)/gm, '   \n');
            } else {
                component.description = null;
            }
        } else {
            component.title = component.displayName;
        }

        if (component.description) {
            component.description = `${component.description}   \n\n`;
        }
        // validate default values
        const modifiedProps =  (component.props) ? 
            Object.entries(component.props).reduce((accum,[propName, propObject]) => {
                const modifiedPropObject = processProp(propObject)
                return {...accum, propName: modifiedPropObject}
            },{}): {}
        
        return {...component, props: modifiedProps};
    });
    return componentObjects
}
async function generateReactDocs({sourceDir,extensions,excludePatterns=[],ignoreDirectory=[],outputDir}){
    
    console.log(sourceDir,'sourcedir')
    const cliOutput = []
    await readFilesPromise(
        sourceDir,
        {
            match: new RegExp('\\.(?:' + extensions.join('|') + ')$'),
            exclude: excludePatterns,
            excludeDir: ignoreDirectory,
        },
        (err, content, filename, next) => {
            if (err) {
                throw err;
            }
            try {
                const components = parseSingleFile(content)
                templateData.files.push({ filename, components });
                cliOutput.push([
                    filename,
                    components.length,
                    Colors.green(`OK.`)
                ]);
            } catch (e) {
                cliOutput.push([
                    filename,
                    0,
                    Colors.red(`You have to export at least one valid React Class!`)
                ]);
            }

            next();
        })

        if (templateData.files.length === 0) {
            console.log(templateData)
            let allExtensions = extensions.map(ext => {
                return `\`*.${ext}\``;
            });
            console.log(`${Colors.bold.yellow('Warning:')} ${Colors.yellow(`Could not find any files matching the file type: ${allExtensions.join(' OR ')}`)}\n`);
        } else {
            console.log(`${cliOutput.toString()}\n\n`);
        }

        return templateData;
}
export default generateReactDocs