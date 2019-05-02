const fs = require("fs-extra");
const path = require("path");

const filesToCopy = ["config", "Models", "Providers", "Screens", "index.ts"];

filesToCopy.forEach(filename => {
  const filePath = path.join(__dirname, "..", "src", filename);

  const outputTemplatesPath = path.join(
    __dirname,
    "..",
    "src/geekyframework/templates"
  );
  fs.ensureDirSync(outputTemplatesPath);

  fs.copySync(filePath, path.join(outputTemplatesPath, filename));
});
