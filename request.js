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
    branchDeletions: [],
    pullRequests: [],
    Issues: [], // will include opening and closing the issue
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

    if (event.type === "DeleteEvent") {
      if (event.payload.ref_type === "branch") {
        extractBranchDeletions(event, result);
      }
    }

    if (event.type === "IssuesEvent") {
      extractIssues(event, result);
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

function extractBranchDeletions(event, container) {
  container.branchDeletions.push({
    repo: event.repo.name,
    branch: event.payload.ref,
  });
}

function extractIssues(event, container) {
  container.Issues.push({
    repo: event.repo.name,
    action: event.payload.action,
    url: event.payload.issue.html_url,
  });
}

module.exports = {
  getUserData,
  getDataSummary,
};
