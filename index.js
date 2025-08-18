const { getUserData, getDataSummary } = require("./request.js");
const { printData } = require("./report.js");
const config = require("./config.js");

async function main() {
  const username = process.argv[2];

  try {
    const dataObj = await getUserData(username);
    const dataSummary = getDataSummary(dataObj, username);
    config.verboseMode = true;
    printData(dataSummary);
  } catch (err) {
    console.log(`An error occurred while trying to get user data:\n${err}`);
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  console.log(`An error occurred while running the program:\n${err}`);
}
