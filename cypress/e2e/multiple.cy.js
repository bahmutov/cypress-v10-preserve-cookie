/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />
// @ts-check

import '../../src'

before(() => {
  cy.setCookie('first', 'a')
  cy.setCookie('second', 'b')
  cy.setCookie('third', 'c')
})

beforeEach(() => {
  // preserve three cookies
  cy.preserveCookieOnce('first', 'second', 'third')
})

it('has the cookies', () => {
  cy.getCookie('first').should('exist')
  cy.getCookie('second').should('exist')
  cy.getCookie('third').should('exist')
})

it('still has the cookies', () => {
  cy.getCookie('first').should('exist')
  cy.getCookie('second').should('exist')
  cy.getCookie('third').should('exist')
})

it('has the correct cookie values', () => {
  cy.getCookie('first').its('value').should('equal', 'a')
  cy.getCookie('second').its('value').should('equal', 'b')
  cy.getCookie('third').its('value').should('equal', 'c')
})
