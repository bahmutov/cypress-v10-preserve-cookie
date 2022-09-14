/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />
// @ts-check

import '../../src'

it('preserves the cookie', () => {
  cy.preserveCookieOnce('connect.sid')
})
