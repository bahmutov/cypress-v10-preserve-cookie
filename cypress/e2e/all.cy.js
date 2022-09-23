/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />
// @ts-check

import '../../src'

before(() => {
  cy.setCookie('x_first', 'a')
  cy.setCookie('x_second', 'b')
  cy.setCookie('x_third', 'c')
})

beforeEach(() => {
  // preserve all cookies that start with "x_"
  const names = ['x_first', 'x_second', 'x_third']
  cy.preserveCookieOnce(...names)
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
