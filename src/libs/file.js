import fs from "fs";
import path from "path";

// Function to write data to a file
export function writeToFile(filename, dir, content) {
  const dirPath = path.join(process.cwd(), dir); // Target directory
  const filePath = path.join(dirPath, filename); // Full file path

  // ✅ Ensure the directory exists before writing
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ File written: ${filePath}`);
}
