const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ue1r2q',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
