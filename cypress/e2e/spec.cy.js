/// <reference types="cypress" />
/// <reference path="../../src/index.d.ts" />

import '../../src'

it('preserves the cookie', () => {
  cy.preserveCookieOnce('connect.sid')
})
