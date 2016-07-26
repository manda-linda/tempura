var jspm = require('gulp-jspm-build');
var gulp = require('gulp');

module.exports = function(){
    jspm({        
        bundleOptions: {
            mangle: false,
            minify: true
        },
        bundleSfx: true,
        bundles: [
            { src: 'src/app.ts', dst: 'tempura.js' }
        ],
        configOverride: {
            baseURL: "/dist",
            packages: {}
        }
    })
    .pipe(gulp.dest('dist'));
};