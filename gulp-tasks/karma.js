var Server = require('karma').Server;
var util = require('gulp-util');

module.exports = function (done) {
  new Server({
    configFile: util.karmaConfig,
    singleRun: true
  }, done).start();
};
