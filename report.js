const config = require("./config.js");

function printData(dataObj) {
  printCommits(dataObj.commits, config.verboseMode);
  printBranchCreations(dataObj.branchCreations);
  printRepoCreations(dataObj.repoCreations);
  printBranchDeletions(dataObj.branchDeletions);
  printPullRequests(dataObj.pullRequests, config.verboseMode);
  printIssues(dataObj.issues, config.verboseMode);
}

function printCommits(commits, verbose = false) {
  if (!commits.length) {
    return;
  }

  console.log("===========");
  console.log("| Commits |");
  console.log("===========");

  for (const commitGroup of commits) {
    console.log(
      `|- Pushed ${commitGroup.length} commits to ${commitGroup[0].repo}`
    );

    if (!verbose) {
      continue;
    }

    for (const commit of commitGroup) {
      console.log(`|  |_ ${commit.hash.slice(0, 7)}: ${commit.message}`);
    }
    console.log("|");
  }

  console.log();
}

function printBranchCreations(branchCreations) {
  if (!branchCreations.length) {
    return;
  }

  console.log("====================");
  console.log("| Branch Creations |");
  console.log("====================");

  for (const branchCreation of branchCreations) {
    console.log(
      `|- Created ${branchCreation.branch} branch in ${branchCreation.repo}`
    );
  }

  console.log();
}

function printRepoCreations(repoCreations) {
  if (!repoCreations.length) {
    return;
  }

  console.log("==================");
  console.log("| Repo Creations |");
  console.log("==================");

  for (const repoCreation of repoCreations) {
    console.log(`|- Created ${repoCreation.repo} repository`);
  }

  console.log();
}

function printBranchDeletions(branchDeletions) {
  if (!branchDeletions.length) {
    return;
  }

  console.log("====================");
  console.log("| Branch Deletions |");
  console.log("====================");

  for (const branchDeletion of branchDeletions) {
    console.log(
      `|- Deleted ${branchDeletion.branch} branch in ${branchDeletion.repo}`
    );
  }

  console.log();
}

function printPullRequests(pullRequests, verbose = false) {
  if (!pullRequests.length) {
    return;
  }

  console.log("=================");
  console.log("| Pull Requests |");
  console.log("=================");

  for (const pullRequest of pullRequests) {
    const verb = capitalizeFirstLetter(pullRequest.action);
    console.log(`|- ${verb} a pull request in ${pullRequest.repo}`);

    if (!verbose) {
      continue;
    }

    console.log(`|  |_ URL: ${pullRequest.url}`);
    console.log("|");
  }

  console.log();
}

function printIssues(issues, verbose = false) {
  if (!issues.length) {
    return;
  }

  console.log("==========");
  console.log("| Issues |");
  console.log("==========");

  for (const issue of issues) {
    const verb = capitalizeFirstLetter(issue.action);
    console.log(`|- ${verb} an issue in ${issue.repo}`);

    if (!verbose) {
      continue;
    }

    console.log(`|  |_ URL: ${issue.url}`);
  }

  console.log();
}

function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  printData,
};
