const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
  
    await user.save()
  }, 10000)
  
  test('creation succeeds with a fresh username', async () => {  
    const usersAtStart = await User.find({})
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails if username or password is missing', async () => {
    const usersAtStart = await User.find({})

    const newUser_1 = {
      name: 'Superuser',
      password: 'salainen',
    }

    const newUser_2 = {
      username: 'root',
      name: 'Superuser'
    }

    const result_1 = await api
      .post('/api/users')
      .send(newUser_1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const result_2 = await api
      .post('/api/users')
      .send(newUser_2)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    expect(result_1.body.error).toContain('username and password are required')
    expect(result_2.body.error).toContain('username and password are required')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 15000)
})

afterAll(() => {
  mongoose.connection.close()
})