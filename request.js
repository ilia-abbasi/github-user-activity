const config = require("./config.js");

async function getUserData(username) {
  if (username === undefined || username === "") {
    throw new Error("No username was provided");
  }

  const url = `https://api.github.com/users/${username}/events`;

  try {
    const response = await fetch(url);
    const responseObj = await response.json();

    if (response.status > 399) {
      throw new Error(
        `Failed to retrieve data. Status code ${response.status}`
      );
    }

    return responseObj;
  } catch (err) {
    console.log(`An error occurred while fetching data:\n${err}`);
    process.exit(1);
  }
}

function getDataSummary(dataObj) {
  const result = {
    commits: [],
    branchCreations: [],
    repoCreations: [],
    pullRequests: [],
    Issues: [],
  };

  for (const event of dataObj) {
    if (event.type === "PushEvent") {
      extractCommits(event, result);
    }
  }

  return result;
}

function extractCommits(event, container) {
  for (const commit of event.payload.commits) {
    container["commits"].push({
      repo: event.repo.name,
      message: commit.message,
      hash: commit.sha,
    });
    config.emails.add(commit.author.email);
  }
}

module.exports = {
  getUserData,
  getDataSummary,
};
