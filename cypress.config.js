const {defineConfig} = require('cypress')
const { report } = require('node:process')

module.exports = defineConfig({
    reporter: 'mochawesome',
    reporterOptions:{
        reportDir: 'cypress/reports',
        overwrite: false,
        html: true,
        json: true
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720
    }
})