//External modules
const yargs = require("yargs");
const express = require("express");
const { hideBin } = require("yargs/helpers");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const http = require("http");

//Local modules
const initRepo = require("./controller/init");
const pushRepo = require("./controller/push");
const pullRepo = require("./controller/pull");
const commitRepo = require("./controller/commit");
const revertRepo = require("./controller/revert");
const addRepo = require("./controller/add");
const pool = require("./config/mysql-config");
const mainRouter = require("./routes/mainRouter");

//dotenv
require("dotenv").config();

//all commands
yargs(hideBin(process.argv))
  .command("start", "Starting new server", {}, startServer)
  .command("init", "Initialise the new repository", {}, initRepo)
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command(
    "revert <commitID>",
    "Revert to the specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    revertRepo,
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

const app = express();

async function startServer() {
  try {
    // Test DB connection
    const connection = await pool.getConnection();
    console.log("Database connected");
    connection.release();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: "*" }));

    app.use("/", mainRouter);

    const PORT = process.env.PORT || 5000;

    // Create HTTP server with app
    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("joinRoom", (userId) => {
        console.log("Joined:", userId);
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Failed to connect with SQL", e.message);
    process.exit(1);
  }
}
