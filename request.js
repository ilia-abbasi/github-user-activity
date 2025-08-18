async function getUserData(username) {
  if (username === undefined || username === "") {
    throw new Error("No username was provided");
  }

  const url = `https://api.github.com/users/${username}/events`;

  try {
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (response.status > 399) {
      throw new Error(
        `Failed to retrieve data. Status code ${response.status}`
      );
    }

    return responseJSON;
  } catch (err) {
    console.log(`An error occurred while fetching data:\n${err}`);
    process.exit(1);
  }
}

function getDataSummary(data) {
  const dataObj = JSON.parse(data);
  const result = {};

  return result;
}

module.exports = {
  getUserData,
  getDataSummary,
};
