const config = require("./config.js");
const fs = require("fs");

const folderName = "logs";
let filePath = folderName + "/log";
let logString = "";

function printData(dataObj) {
  printPersonalInfo();
  printCommits(dataObj.commits, config.verboseMode);
  printBranchCreations(dataObj.branchCreations);
  printRepoCreations(dataObj.repoCreations);
  printBranchDeletions(dataObj.branchDeletions);
  printPullRequests(dataObj.pullRequests, config.verboseMode);
  printIssues(dataObj.issues, config.verboseMode);
  printPublicEvents(dataObj.publicEvents);
  printStars(dataObj.stars);
}

function printPersonalInfo() {
  log("============");
  log("| Personal |");
  log("============");
  log();
  log(`ID: ${config.id}`);
  log();
  log("Email(s):");

  for (const email of config.emails) {
    log(`- ${email}`);
  }

  log();
}

function printCommits(commits, verbose = false) {
  if (!commits.length) {
    return;
  }

  log("===========");
  log("| Commits |");
  log("===========");

  let firstIteration = true;

  for (const commitGroup of commits) {
    const count = commitGroup.length;

    if (!firstIteration) log("|");
    firstIteration = false;

    log(
      `|- Pushed ${count} ${plural("commit", count)} to ${commitGroup[0].repo}`
    );

    if (!verbose) {
      continue;
    }

    for (const commit of commitGroup) {
      log(`|  |_ ${commit.hash.slice(0, 7)}: ${commit.message}`);
    }
  }

  log();
}

function printBranchCreations(branchCreations) {
  if (!branchCreations.length) {
    return;
  }

  log("====================");
  log("| Branch Creations |");
  log("====================");

  for (const branchCreation of branchCreations) {
    log(`|- Created ${branchCreation.branch} branch in ${branchCreation.repo}`);
  }

  log();
}

function printRepoCreations(repoCreations) {
  if (!repoCreations.length) {
    return;
  }

  log("==================");
  log("| Repo Creations |");
  log("==================");

  for (const repoCreation of repoCreations) {
    log(`|- Created ${repoCreation.repo} repository`);
  }

  log();
}

function printBranchDeletions(branchDeletions) {
  if (!branchDeletions.length) {
    return;
  }

  log("====================");
  log("| Branch Deletions |");
  log("====================");

  for (const branchDeletion of branchDeletions) {
    log(`|- Deleted ${branchDeletion.branch} branch in ${branchDeletion.repo}`);
  }

  log();
}

function printPullRequests(pullRequests, verbose = false) {
  if (!pullRequests.length) {
    return;
  }

  log("=================");
  log("| Pull Requests |");
  log("=================");

  for (const pullRequest of pullRequests) {
    const verb = capitalizeFirstLetter(pullRequest.action);
    log(`|- ${verb} a pull request in ${pullRequest.repo}`);

    if (!verbose) {
      continue;
    }

    log(`|  |_ URL: ${pullRequest.url}`);
    log("|");
  }

  log();
}

function printIssues(issues, verbose = false) {
  if (!issues.length) {
    return;
  }

  log("==========");
  log("| Issues |");
  log("==========");

  for (const issue of issues) {
    const verb = capitalizeFirstLetter(issue.action);
    log(`|- ${verb} an issue in ${issue.repo}`);

    if (!verbose) {
      continue;
    }

    log(`|  |_ URL: ${issue.url}`);
  }

  log();
}

function printPublicEvents(publicEvents) {
  if (!publicEvents.length) {
    return;
  }

  log("=================");
  log("| Public Events |");
  log("=================");

  for (const publicEvent of publicEvents) {
    log(`|- Made ${publicEvent.repo} repository public`);
  }

  log();
}

function printStars(stars) {
  if (!stars.length) {
    return;
  }

  log("=========");
  log("| Stars |");
  log("=========");

  for (const star of stars) {
    log(`|- Starred ${star.repo} repository`);
  }

  log();
}

function log(str = "") {
  logString = `${logString}${str}\n`;
  console.log(str);
}

function saveLog(isForced = false) {
  if (!config.saveLogMode && !isForced) {
    return;
  }

  // Making logs folder if it does not exist
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.log(
      `An error occurred while trying to make the ${folderName} folder:`
    );
    console.log(err);
  }

  // Finding an unused name for the log file
  let i = 0;
  while (fs.existsSync(`${filePath}${i}.txt`)) {
    i++;
  }
  filePath = `${filePath}${i}.txt`;

  // Saving logString to file
  try {
    fs.writeFileSync(filePath, logString);
    console.log(`Log was saved in ${filePath}`);
  } catch (err) {
    console.log(`An error occurred while trying to save log in ${filePath}:`);
    console.log(err);
  }
}

function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function plural(str, count = 2) {
  if (count === 1) {
    return str;
  }

  return `${str}s`;
}

module.exports = {
  printData,
  saveLog,
};
