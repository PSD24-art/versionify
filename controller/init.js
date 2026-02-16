const fs = require("fs").promises;
const { writeFile } = require("fs");
const path = require("path/win32");

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".versionify");
  const commitPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET }),
    );
    console.log("initialized empty repository");
  } catch (error) {
    console.log("Failed to initialize repository", error);
  }
}

module.exports = initRepo;
