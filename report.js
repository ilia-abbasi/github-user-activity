const config = require("./config.js");

function printData(dataObj) {
  printCommits(dataObj.commits, config.verboseMode);
  printBranchCreations(dataObj.branchCreations, config.verboseMode);
  printRepoCreations(dataObj.repoCreations, config.verboseMode);
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

function printBranchCreations(branchCreations, verbose = false) {
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

function printRepoCreations(repoCreations, verbose = false) {
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

module.exports = {
  printData,
};
