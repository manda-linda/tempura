var gulp = require('gulp'),
    del = require('del'),
    karmaConfig = __dirname + '/config/karma.conf.js',
    util = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');


util.karmaConfig = karmaConfig;

require('gulp-load-tasks')('gulp-tasks');


gulp.task('test', function() {
  gulp.start('karma');
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('build', ['clean', 'test', 'sass'], function() {
    gulp.start('jspm');
    gulp.src('./css/**/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('tempura.min.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('serve', ['sass', 'sass:watch'], function() {
  connect.server({
    root:['./', 'demo'],
    port: 8080
  });
});
