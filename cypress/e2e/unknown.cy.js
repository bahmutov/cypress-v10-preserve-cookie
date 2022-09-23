/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />
// @ts-check

import '../../src'

// let's say we don't know the cookies we want to preserve at first
// but we know the all start with "x_". We will fill this list later
const cookieNames = []

before(() => {
  // pretend the application sets these cookies
  cy.setCookie('x_first', 'a')
  cy.setCookie('x_second', 'b')
  cy.setCookie('x_third', 'c')
})

beforeEach(() => {
  cy.getCookies().then((list) => {
    // find all cookies that start with "x_"
    const names = list
      .map((c) => c.name)
      .filter((name) => name.startsWith('x_'))
    if (names.length) {
      cy.log('will preserve cookies', names)
      cookieNames.push(...names)
    }
  })
})

beforeEach(() => {
  // preserve the cookies, but only if we have the list of them
  if (cookieNames.length) {
    cy.preserveCookieOnce(...cookieNames)
  }
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
