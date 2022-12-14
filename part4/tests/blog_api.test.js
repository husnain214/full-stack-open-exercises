const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

let token = ''

beforeEach(async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  const savedUser = await user.save()

  const loggedUser = await api
    .post('/api/login')
    .send({
      username: 'root', password: 'sekret'
    })

  token = 'Bearer ' + JSON.parse(loggedUser.text).token

  await Blog.deleteMany({})

  initialBlogs.forEach(blog => {
    blog['likes'] = blog.likes ? blog.likes : 0
    blog['user'] = savedUser._id.toHexString()
  })

  await Blog.insertMany(initialBlogs)
}, 20000)

describe('tests for when there is some data stored in database', () => {
  test('number of blogs is correct', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token)
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('the default _id in mongoose is changed to just id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token)
  
    expect(response.body[0].id).toBeDefined()
  }, 100000)
  
  test('if likes are not given they are given the value of 0', async () => {
    const receivedBlogs = await Blog.find({})
  
    const result = receivedBlogs.every(blog => blog.likes >= 0)
    
    expect(result).toBe(true)
  })
  
  test('title or url are not missing from request data', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  
    await api.post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })
})

describe('testing all REST API requests', () => {
  test('testing POST request', async () => {  
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }
  
    await api.post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
  
    const allBlogs = await Blog.find({})
  
    expect(allBlogs.length).toBe(initialBlogs.length + 1)
  })

  test('testing DELETE request', async () => {
    let allBlogs = await Blog.find({})
    const id = allBlogs[0]._id.toHexString()

    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', token)
      .expect(204)

    allBlogs = await Blog.find({})

    expect(allBlogs).toHaveLength(initialBlogs.length - 1)
  })

  test('testing PUT request', async () => {
    let allBlogs = await Blog.find({})
    const id = allBlogs[0]._id.toHexString()

    await api.put(`/api/blogs/${id}`)
      .set('Authorization', token)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
  