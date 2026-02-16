const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const {
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".versionify");

  try {
    // 1️⃣ List all objects inside commits/
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: "commits/",
    });

    const data = await s3.send(listCommand);
    const objects = data.Contents;

    if (!objects || objects.length === 0) {
      console.log("No commits found in S3");
      return;
    }

    // 2️⃣ Download each file
    for (let object of objects) {
      const key = object.Key;

      if (key.endsWith("/")) continue; // skip folders

      const getCommand = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      });

      const response = await s3.send(getCommand);

      const fileContent = await streamToBuffer(response.Body);

      const localFilePath = path.join(repoPath, key);

      await fs.mkdir(path.dirname(localFilePath), {
        recursive: true,
      });

      await fs.writeFile(localFilePath, fileContent);
    }

    console.log("All data pulled from AWS S3");
  } catch (err) {
    console.error("Error Pulling from AWS", err);
  }
}

// Helper to convert stream to buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

module.exports = pullRepo;
