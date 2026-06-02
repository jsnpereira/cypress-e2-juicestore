const {defineConfig} = require('cypress')
const { allureCypress } = require('allure-cypress/reporter');
const fs = require('fs');


module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {
            on('task', {
                reportAllureCypressSpecMessages() {
                    return null;
                },
                reportFinalAllureCypressSpecMessages() {
                    return null;
                },
                deleteFile(path) {
                    if (fs.existsSync(path)) {
                        fs.unlinkSync(path);
                    }
                    return null;
                }
            }),
            allureCypress(on, config, {
                    resultsDir: "allure-results",
            });
        return config;
        }
    }
})