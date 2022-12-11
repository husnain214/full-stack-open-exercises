const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const promiseArray = initialBlogs
    .map( blog => {
      if(!Object.prototype.hasOwnProperty.call(blog, 'likes')) 
        blog['likes'] = 0

      return new Blog(blog)
    } )
    .map( blog => blog.save() )

  await Promise.all(promiseArray)

  console.log('done')
}, 10000)

describe('tests for when there is some data stored in database', () => {
  test('number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('the default _id in mongoose is changed to just id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  }, 100000)
  
  test('if likes are not given they are given the value of 0', async () => {
    const receivedBlogs = await Blog.find({})
  
    const result = receivedBlogs.every(blog => blog.likes >= 0)
    
    expect(result).toBe(true)
  })
  
  test('title or url are not missing from request data', async () => {
    const newBlog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('testing all REST API requests', () => {
  test('testing POST request', async () => {
    const newBlog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }
  
    await api.post('/api/blogs').send(newBlog).expect(201)
  
    const allBlogs = await Blog.find({})
  
    expect(allBlogs.length).toBe(initialBlogs.length + 1)
  })

  test('testing DELETE request', async () => {
    await api