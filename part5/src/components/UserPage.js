import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogService'
import Notification from './Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'

const UserPage = ({ setUser, user }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenVisible = { display: formVisible ? 'none' : '' }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs( blogs )
      }
      )
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async newBlog => {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))

    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} has been added`)
    setTimeout(() => setMessage(''), 3000)
    setFormVisible(false)
  }

  return (
    (
      <div>
        <h2>blogs</h2>

        <Notification message = {message} />

        {user.name} logged in

        <button onClick={ handleLogout }>logout</button>

        <div style={ hideWhenVisible }>
          <button onClick={ () => setFormVisible(true) }>new Blog</button>
        </div>

        <BlogForm
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          createBlog={createBlog}
        />

        {blogs.length === 0
          ? '...'
          : blogs
            .sort((first, second) => second.likes - first.likes)
            .map(blog =>
              <Blog
                key = {blog.id}
                blog = {blog}
                blogs = {blogs}
                setBlogs = {setBlogs}
                user= {user}
              />
            )
        }
      </div>
    )
  )
}

BlogForm.propTypes = {
  formVisible: PropTypes.bool.isRequired,
  setFormVisible: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default UserPage