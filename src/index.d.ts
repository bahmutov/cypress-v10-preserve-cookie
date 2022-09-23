declare namespace Cypress {
  interface Chainable {
    /**
     * Equivalent of `Cypress.Cookies.preserveOnce(name)`
     * @example cy.preserveCookieOnce('connect.sid')
     * @see https://github.com/bahmutov/cypress-v10-preserve-cookie
     */
    preserveCookieOnce(name: string): void

    /**
     * Equivalent of `Cypress.Cookies.preserveOnce(name, anotherName, ...)`
     * @example cy.preserveCookieOnce('connect.sid', 'refresh_token')
     * @see https://github.com/bahmutov/cypress-v10-preserve-cookie
     */
    preserveCookieOnce(...names: string[]): void
  }
}
