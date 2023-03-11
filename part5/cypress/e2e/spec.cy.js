describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.createUser({
      name: 'Husnain',
      username: 'root',
      password: 'salainen'
    })

    cy.visit('')
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
      cy.login({
        username: 'root',
        password: 'salainen'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('Show your work')
      cy.get('#author').type('Austin Kleone')
      cy.get('#url').type('https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X')
      cy.get('#createBlogBtn').click()

      cy.contains('Show your work')
    })

    describe('some blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Show your work',
          author: 'Austin Kleone',
          url: 'https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X'
        })

        cy.visit('')
      })

      it('User can like a blog', function() {
        cy.contains('Show your work').contains('view').click()
        cy.contains('Show your work').contains(0)
        cy.contains('Show your work').contains('like').click()
        cy.wait(2000)
        cy.contains('Show your work').should('contain', 1)
      })

      it('User can delete his own blogs', function() {
        cy.contains('Show your work').contains('view').click()
        cy.contains('Show your work').contains('remove').click()
        cy.should('not.contain', 'Show your work')
      })

      it('Other users cannot see the remove button', function() {
        cy.contains('logout').click()

        cy.createUser({
          name: 'Hamza',
          username: 'shahid',
          password: 'shahid'
        })

        cy.get('#username').type('shahid')
        cy.get('#password').type('shahid')
        cy.get('#log-in-button').click()

        cy.contains('Show your work').contains('view').click()
        cy.contains('Show your work').contains('button', 'remove').should('exist')
      })

      it('Blogs are sorted according to likes', function() {
        cy.createBlog({
          title: 'A Game of Thrones',
          author: 'G.R.R Martin',
          url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwiiy5OpgNL9AhUDjWgJHd42CDUYABAAGgJ3Zg&sig=AOD64_0qNISyCF7OuPaYQKCDKRBvr1ApFg&q&adurl&ved=2ahUKEwiZgI2pgNL9AhV8UqQEHShsDsQQ0Qx6BAgNEAE'
        })

        cy.visit('')

        cy.get('.blog').eq(0).should('contain', 'Show your work')
        cy.get('.blog').eq(1).should('contain', 'A Game of Thrones')

        cy.contains('A Game of Thrones').contains('view').click()
        cy.contains('A Game of Thrones').contains('like').click()

        cy.wait(1000)

        cy.get('.blog').eq(1).should('contain', 'Show your work')
        cy.get('.blog').eq(0).should('contain', 'A Game of Thrones')
      })
    })
  })
})