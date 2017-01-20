const Hapi = require('hapi');
const circleci = require('./circleci');
const renderer = require('./renderer');

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    circleci.getBuilds(request.params.build).then((builds)=> {
      builds = builds.filter((build)=> build.status === 'failed');
      reply(renderer.render('build/list', { builds }));
    });
  }
});

server.route({
  method: 'GET',
  path: '/build/{build}',
  handler: function (request, reply) {
    let buildNumber = request.params.build;
    circleci.getDiffs(buildNumber).then((diffs)=> {
      reply(renderer.render('diff/list', { diffs, buildNumber }));
    });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
