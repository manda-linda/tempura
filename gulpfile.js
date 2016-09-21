var gulp = require('gulp'),
    del = require('del'),
    inlinesource = require('gulp-inline-source'),
    HTMLReplace = require('gulp-html-replace'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    karmaConfig = __dirname + '/config/karma.conf.js',
    util = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    angulartemplates = require('gulp-angular-templates'),
    minifyJS = require('gulp-minify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');


util.karmaConfig = karmaConfig;

require('gulp-load-tasks')('gulp-tasks');


gulp.task('test', function() {
  return gulp.run('karma');
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

gulp.task('css', function() {
    return gulp.src('./css/**/*.css')
      .pipe(minifyCSS())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(concat('tempura.min.css'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function() {
    return gulp.src('./src/**/template/*.html')
        .pipe(angulartemplates({
            module: 'tempura'
        }))
        .pipe(concat('tempura-templates.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'test', 'sass'], function() {
    runSequence(['clean', 'test', 'sass'], ['jspm', 'css', 'templates'], 'build-index');
});

gulp.task('build-index', function() {
    return gulp.src('./index.html')
        .pipe(inlinesource())
        .pipe(HTMLReplace({
          'js': 'demo.js'
        }))
        .pipe(rename({
            basename: "index"
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('serve', ['sass', 'sass:watch'], function() {
  connect.server({
    root:['./', './demo'],
    port: 8080
  });
});
