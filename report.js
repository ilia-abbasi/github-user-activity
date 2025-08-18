const config = require("./config.js");

function printData(dataObj) {
  printCommits(dataObj.commits, config.verboseMode);
  printBranchCreations(dataObj.branchCreations, config.verboseMode);
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

module.exports = {
  printData,
};
