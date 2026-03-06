module.exports = {
  allowCypressEnv: false,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Automation Tests",
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl: 'https://saucedemo.com',
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
};
