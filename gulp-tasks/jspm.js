var jspm = require('gulp-jspm-build');
var gulp = require('gulp');

module.exports = function(){
    return jspm({        
        bundleOptions: {
            mangle: false,
            minify: true
        },
        bundleSfx: true,
        bundles: [
            { src: 'src/app.ts', dst: 'dist/tempura.js' },
            { src: 'demo/bootstrapper.js', dst: 'docs/demo.js' }
        ]
    })
    .pipe(gulp.dest('./'));
};