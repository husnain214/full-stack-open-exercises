describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Husnain',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#log-in-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('husnain')
      cy.get('#password').type('salainen')
      cy.get('#log-in-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#log-in-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new Note').click()
      cy.get('#title').type('Show your work')
      cy.get('#author').type('Austin Kleone')
      cy.get('#url').type('https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X')
      cy.get('#createNoteBtn').click()

      cy.contains('Show your work')
    })

    it.only('User can like a blog', function() {
      cy.contains('new Note').click()
      cy.get('#title').type('Show your work')
      cy.get('#author').type('Austin Kleone')
      cy.get('#url').type('https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X')
      cy.get('#createNoteBtn').click()

      cy.get('.show-btn').click()
    })
  })
})