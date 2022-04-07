import generateReactDocs from "../generatereactdoc";
import path from "path";

describe("GenerateReactDoc", () => {
  it("Whole thing should work", async () => {
    const output = await generateReactDocs({
      sourceDir: path.resolve(__dirname, "../__mocks__"),
      extensions: ["js", "jsx"],
      outputDir: path.resolve(__dirname, "../__mocks__/output.md"),
    });
    expect(output).toMatchSnapshot();
  });
});
