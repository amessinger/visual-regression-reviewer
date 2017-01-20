const CircleCI = require('circleci');

const ci = new CircleCI({
  auth: process.env.CIRCLECI_TOKEN
});

const username = 'peopledoc';
const project = 'peopledoc-ui';
const diffsFolder = 'diff/';

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
