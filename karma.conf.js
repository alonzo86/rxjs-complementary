module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine', "karma-typescript"],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-typescript'),
            require('karma-jasmine-html-reporter'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                random: false
            }
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
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
            '**/*.ts': 'karma-typescript'
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                module: 'commonjs'
            },
            tsconfig: './tsconfig.json',
        },
    });
};
