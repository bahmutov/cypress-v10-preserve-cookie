const debug = require('debug')('cypress-v10-preserve-cookie')

Cypress.Commands.add('preserveCookieOnce', (...names) => {
  if (!names.length) {
    throw new Error('Expected at least one cookie name')
  }

  names.forEach((name) => {
    if (typeof name !== 'string' || !name) {
      throw new Error('Expected the cookie name to preserve')
    }
    cy.log(`preserveCookieOnce **${name}**`)
    debug('cookie name "%s"', name)
    const saveName = 'cookie_' + name
    cy.getCookie(name, { log: false })
      // disable the built-in existence check
      .should(Cypress._.noop)
      .then((c) => {
        if (!c) {
          debug('there is no cookie named %s', name)
          const previouslySaved = Cypress.env(saveName)
          if (previouslySaved) {
            debug(
              'setting the previously saved cookie %s %o',
              name,
              previouslySaved,
            )
            cy.setCookie(name, previouslySaved.value, { log: false })
          }
        } else {
          debug('saving found cookie %s %o', name, c)
          Cypress.env(saveName, c)
        }
      })
  })
})
