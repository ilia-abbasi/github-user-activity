const { getUserData } = require("./request.js");

async function main() {
  try {
    console.log(await getUserData());
  } catch (err) {
    console.log(`An error occurred while trying to get user data:\n${err}`);
  }
}

try {
  main();
} catch (err) {
  console.log(`An error occurred while running the program:\n${err}`);
}
