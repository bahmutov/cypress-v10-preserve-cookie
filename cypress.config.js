const { defineConfig } = require('cypress')

let galleta

module.exports = defineConfig({
  fixturesFolder: false,
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        setGalleta: (val) => {
          return (galleta = val)
        },
        getGalleta: () => {
          return galleta
        },
      })
    },
  },
})
