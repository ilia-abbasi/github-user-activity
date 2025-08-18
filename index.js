const { getUserData, getDataSummary } = require("./request.js");

async function main() {
  const username = process.argv[2];

  try {
    const dataJSON = await getUserData(username);
    const dataObj = getDataSummary(dataJSON);
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
