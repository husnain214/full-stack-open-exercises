const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.post('/', userExtractor, async (request, response) => {   
  const { body, user } = request

  if(!body.url || !body.title) {
    return response.status(400).json({ 
      error: 'url or title is missing' 
    })
  }
  
  if(!body.likes) {
    body['likes'] = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if(blog.user.toString() !== user.id) {
    return response.status(401).json({ 
      error: 'token is missing or invalid' 
    })
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  
  blog['likes'] = request.body.likes
  blog['comments'] = request.body.comments

  await Blog.findByIdAndUpdate(id, blog, { updated: true })
  response.json(blog)
})

module.exports = blogRouter