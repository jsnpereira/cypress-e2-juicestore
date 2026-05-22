const {defineConfig} = require('cypress')
const { allureCypress } = require('allure-cypress/reporter');


module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {
             allureCypress(on, config, {
                    resultsDir: "allure-results",
            });
        return config;
        }
    }
})