describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', {
      name: 'Husnain',
      username: 'root',
      password: 'salainen'
    })

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
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'root',
        password: 'salainen'
      }).then( ({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
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
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title: 'Show your work',
            author: 'Austin Kleone',
            url: 'https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })

        cy.visit('http://localhost:3000')
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

      it.only('Other users cannot see the remove button', async function() {
        cy.contains('logout').click()

        cy.request('POST', 'http://localhost:3003/api/users/', {
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
    })
  })
})