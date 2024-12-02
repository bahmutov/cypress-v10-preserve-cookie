/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />
// @ts-check

import '../../src'

// Ussing the command cy.getCookies you can get all the cookies and with cy.task you can send then to the beforeEach hook.
// You need to set the cy.task on the cypress.config.js file with:
/* let galleta

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
*/

before(() => {
  // pretend the application sets these cookies
  cy.setCookie('x_first', 'a')
  cy.setCookie('x_second', 'b')
  cy.setCookie('x_third', 'c')

  //Get all the cookies and store them using the task command
  cy.getCookies().then((cook) => {
    let galleta = []
    cook.forEach((ck) => {
      galleta.push(ck.name)
    })
    cy.task('setGalleta', galleta)
  })
})

beforeEach(() => {
  //Set all the cookies stored on the before hook.
  cy.task('getGalleta').then((galleta) => {
    if (galleta.length) {
      cy.log('will preserve cookies', galleta)
      cy.preserveCookieOnce(...galleta)
    }
  })
})

it('has the cookies', () => {
  cy.getCookie('x_first').should('exist')
  cy.getCookie('x_second').should('exist')
  cy.getCookie('x_third').should('exist')
})

it('still has the cookies', () => {
  cy.getCookie('x_first').should('exist')
  cy.getCookie('x_second').should('exist')
  cy.getCookie('x_third').should('exist')
})

it('has the correct cookie values', () => {
  cy.getCookie('x_first').its('value').should('equal', 'a')
  cy.getCookie('x_second').its('value').should('equal', 'b')
  cy.getCookie('x_third').its('value').should('equal', 'c')
})
