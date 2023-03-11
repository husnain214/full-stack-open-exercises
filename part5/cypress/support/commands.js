Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    name,
    username,
    password
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password
  }).then( ({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url
    },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})