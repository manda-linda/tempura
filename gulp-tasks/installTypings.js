var gulp = require('gulp');
var gulpTypings = require("gulp-typings");

module.exports = function(){
    var stream = gulp.src("typings.json")
        .pipe(gulpTypings()); 
    return stream; 
};