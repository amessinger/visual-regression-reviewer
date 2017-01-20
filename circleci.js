const CircleCI = require('circleci');
const argv = require('yargs')
  .usage('Usage: $0 --username [string] --project [string] --directory [string]')
  .alias('username', 'u')
  .alias('project', 'p')
  .alias('directory', 'd')
  .default('directory', 'diff/')
  .demandOption(['username','project'])
  .argv;

const ci = new CircleCI({
  auth: process.env.CIRCLECI_TOKEN
});

const username = argv.username;
const project = argv.project;
const diffsFolder = argv.directory;

exports.getDiffs = (buildNumber)=> {
  return new Promise((resolve)=> {
    ci.getBuildArtifacts({
      username,
      project,
      build_num: buildNumber
    }).then((artifacts)=> {
      let diffs = artifacts.filter((artifact)=> artifact.path.includes(diffsFolder));
      resolve(diffs);
    });
  });
};

exports.getBuilds = (buildNumber)=> {
  return new Promise((resolve)=> {
    ci.getBuilds({
      username,
      project
    }).then(resolve);
  });
};
