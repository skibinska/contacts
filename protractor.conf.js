exports.config = {

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the configuration file location passed
    // to protractor (here protractor.conf.js).
    // They may include glob patterns.
    specs: ['tests/e2e/**/*.js'],

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    suites: {
        contacts: ['tests/e2e/contacts/**/*.js'],
        contact: ['tests/e2e/contact/**/*.js'],
        search: ['tests/e2e/search/**/*.js'],
        test: ['tests/e2e/test/**/*.js']
    },

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be resolved against this URL (via url.resolve)
    baseUrl: 'http://local.contacts.com',

    // CSS Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>.
    rootElement: 'html',

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 11000,

    // How long to wait for a page to load.
    getPageTimeout: 10000,

    // Test framework to use.
    framework: 'jasmine',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 2500000
    }
};