var Server = require('karma').Server;
var util = require('gulp-util');

module.exports = function (done) {
  return new Server({
    configFile: util.karmaConfig,
    singleRun: true
  }, done).start();
};
