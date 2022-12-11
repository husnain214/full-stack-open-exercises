const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {   
  if(!Object.prototype.hasOwnProperty.call(request.body, 'url')
  || !Object.prototype.hasOwnProperty.call(request.body, 'title')) 
    return response.status(400).json({ error: 'url or title is missing' })
  
  if(!Object.prototype.hasOwnProperty.call(request.body, 'likes')) 
    request.body['likes'] = 0
  
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  
  blog['likes'] = request.body.likes

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { updated: true })
  response.json(updatedBlog)
})

module.exports = blogRouter