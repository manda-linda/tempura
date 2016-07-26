var gulp = require('gulp');
var del = require('del');
var karmaConfig = __dirname + '/config/karma.conf.js';
var util = require('gulp-util');
util.karmaConfig = karmaConfig;

require('gulp-load-tasks')('gulp-tasks');


gulp.task('test', function() {
  gulp.start('karma');
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('build', ['clean'], function() {
    gulp.start('jspm');
})

