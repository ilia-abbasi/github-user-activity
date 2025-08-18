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
    if (event.type === "CreateEvent") {
      if (event.payload.ref_type === "branch") {
        extractBranchCreations(event, result);
      }
      if (event.payload.ref_type === "repository") {
        extractRepoCreations(event, result);
      }
    }
  }

  return result;
}

function extractCommits(event, container) {
  for (const commit of event.payload.commits) {
    container.commits.push({
      repo: event.repo.name,
      message: commit.message,
      hash: commit.sha,
    });
    config.emails.add(commit.author.email);
  }
}

function extractBranchCreations(event, container) {
  container.branchCreations.push({
    repo: event.repo.name,
    branch: event.payload.ref,
  });
}

function extractRepoCreations(event, container) {
  container.repoCreations.push({
    repo: event.repo.name,
  });
}

module.exports = {
  getUserData,
  getDataSummary,
};
