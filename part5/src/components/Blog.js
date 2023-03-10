import { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, setBlogs, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }

  function userAndBlogIDMatch() {
    if(!user.blogs.length) return false
    if(user.blogs.find(blog.id) === undefined) return false

    return true
  }

  const removeBtnVisible = { display: userAndBlogIDMatch() ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLike = async () => {
    blog = { ...blog, likes: blog.likes + 1 }

    await blogService.update(blog.id, blog)
    const blogList = await blogService.getAll()

    setBlogs(blogList)
  }

  const deleteBlog = async () => {
    const deleteConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(!deleteConfirm) return

    await blogService.remove(blog.id)
    const blogList = await blogService.getAll()
    setBlogs(blogList)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}

      <div style={ showWhenVisible } className='blog-details'>
        {blog.url} <br />

        likes <span id='numOfLikes'>{blog.likes}</span>
        <button type='button' className='like-btn' onClick={incrementLike}>like</button>
        <br />

        {blog.author} <br />
      </div>

      <button
        onClick={ () => setDetailsVisible(true) }
        style={ hideWhenVisible }
        className='show-btn'
        id='show-btn'
      >view</button>
      <button
        onClick={ () => setDetailsVisible(false) }
        style={ showWhenVisible }
        className='hide-btn'
        id='hide-btn'
      >hide</button>
      <button onClick={ deleteBlog } style={ removeBtnVisible }>remove</button>
    </div>
  )
}

export default Blog