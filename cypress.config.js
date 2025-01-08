const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Ορίζει το base URL
    //setupNodeEvents(on, config) {
      // Μπορείς να προσθέσεις event listeners εδώ αν χρειάζεται
    //},
  },
});