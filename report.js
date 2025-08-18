const config = require("./config.js");

function printData(dataObj) {
  printCommits(dataObj.commits, config.verboseMode);
}

function printCommits(commits, verbose = false) {
  if (!commits.length) {
    return;
  }

  for (const commitGroup of commits) {
    console.log(
      `- Pushed ${commitGroup.length} commits to ${commitGroup[0].repo}`
    );

    if (!verbose) {
      continue;
    }

    for (const commit of commitGroup) {
      console.log(`  |_ ${commit.hash.slice(0, 7)}: ${commit.message}`);
    }
    console.log();
  }
}

module.exports = {
  printData,
};
