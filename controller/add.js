const fs = require("fs").promises;
const { writeFile } = require("fs");
const path = require("path/win32");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".versionify");
  const stagingPath = path.join(repoPath, "staging");
  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET }),
    );
    console.log(`File ${fileName} added to staging successfully`);
  } catch (error) {
    console.log("Failed to initialize repository", error);
  }
}

module.exports = addRepo;
