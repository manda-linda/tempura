// Karma configuration
// Generated on Tue Jul 26 2016 16:53:21 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm','jasmine', 'phantomjs-shim'],

    files: [        
      'node_modules/angular/angular.min.js'
    ],

    jspm: {
      config: 'config/systemjs-config.js',
      stripExtension: false,
      loadFiles: [
        'jspm_packages/npm/angular-mocks@1.5.3/angular-mocks.js',
        'config/mock-modules.js',
        'test-lib/helpers.js',
        'src/**/*-spec.ts',
        'src/**/*-spec.js'      
      ],
      serveFiles: [
        'src/**/!(*spec).*',
        'test-lib/*',
        'config/**/*.js'
     ],
     packages: 'jspm_packages',
     paths: {
        "npm:*": "/jspm_packages/npm/*",
        '*': '/*'
      }
    },
    proxies: {
      '/src' : '/base/src/',
      '/config' : '/base/config',
      '/node_modules' : '/base/node_modules',
      '/jspm_packages':'/base/jspm_packages',
      '/test-lib': '/base/test-lib'
    },

    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });

  if(process.env.TRAVIS) {
    config.browsers = ['PhantomJS'];
  }
}
