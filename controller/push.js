const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".versionify");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);

    for (let commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (let file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);

        const command = new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        });

        await s3.send(command);
      }
    }

    console.log("All commits pushed to AWS S3");
  } catch (err) {
    console.error("Error Pushing to AWS", err);
  }
}

module.exports = pushRepo;
