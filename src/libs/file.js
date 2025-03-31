import fs from "fs";
import path from "path";

// Function to write data to a file
export function writeToFile(filename, content) {
  const dirPath = path.join(process.cwd(), "content"); // Target directory
  const filePath = path.join(dirPath, filename); // Full file path

  // ✅ Ensure the directory exists before writing
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ File written: ${filePath}`);
}

// https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
// const arrayOfBase64 = await fileListToBase64(yourFileList)
export async function fileListToBase64(fileList) {
  // create function which return resolved promise
  // with data:base64 string
  function getBase64(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (ev) => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          src: ev.target.result,
        });
      };
      reader.readAsDataURL(file);
    });
  }
  // here will be array of promisified functions
  const promises = [];

  // loop through fileList with for loop
  for (let i = 0; i < fileList.length; i++) {
    promises.push(getBase64(fileList[i]));
  }

  // array with base64 strings
  return await Promise.all(promises);
}
