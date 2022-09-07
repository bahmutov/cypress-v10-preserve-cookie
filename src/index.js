Cypress.Commands.add('preserveCookieOnce', (name) => {
  expect(name, 'cookie name to preserve').to.be.a('string')
  const saveName = 'cookie_' + name
  cy.getCookie(name)
    .should(Cypress._.noop)
    .then((c) => {
      if (!c) {
        // console.log('there is no cookie named %s', name)
        const previouslySaved = Cypress.env(saveName)
        if (previouslySaved) {
          // console.log(
          //   'setting the previously saved cookie %s %o',
          //   name,
          //   previouslySaved,
          // )
          cy.setCookie(name, previouslySaved.value)
        }
      } else {
        // console.log('saving found cookie %s %o', name, c)
        Cypress.env(saveName, c)
      }
    })
})
