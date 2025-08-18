const { getUserData, getDataSummary } = require("./request.js");
const { printData, saveLog } = require("./report.js");
const config = require("./config.js");
const argv = process.argv;

async function main() {
  argv.splice(0, 2);

  handleArgv();

  const username = argv[0];
  const dataObj = await getUserData(username);
  const dataSummary = getDataSummary(dataObj, username);

  printData(dataSummary);

  saveLog();
}

function handleArgv() {
  if (argv.length === 0) {
    console.log("No arguments were given. Exitting with code 1.");
    process.exit(1);
  }

  if (argv.includes("h") || argv.includes("help")) {
    showHelp();
    process.exit(0);
  }

  if (argv.includes("v")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("v"), 1);
  }
  if (argv.includes("verbose")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("verbose"), 1);
  }

  if (argv.includes("s")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("s"), 1);
  }
  if (argv.includes("save")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("save"), 1);
  }

  if (argv.length === 0) {
    console.log("No username was given. Exitting with code 1.");
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Usage: npm run start [username] [options]

Options:
    h  OR  help           Shows this section. Explains different options.
    v  OR  verbose        Logs more messages to the console, including the
                          hash and message of each commit and some URLs.
    s  OR  save           Report will be saved after the execution of program.
    `);
}

try {
  main();
} catch (err) {
  console.log(`An error occurred while running the program:\n${err}`);
}
