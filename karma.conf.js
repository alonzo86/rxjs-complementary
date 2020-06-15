const path = require('path');

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-typescript'),
            require('karma-coverage-istanbul-reporter')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                random: false
            }
        },
        reporters: ['progress', 'karma-typescript', 'coverage-istanbul'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
          ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
          }
        },
        singleRun: true,
        files: [
            'src/**/*.ts'
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                module: 'commonjs'
            },
            tsconfig: './tsconfig.json',
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: path.join(__dirname, 'coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            'report-config': {
                html: {
                    subdir: 'html'
                }
            }
        }
    });
};
