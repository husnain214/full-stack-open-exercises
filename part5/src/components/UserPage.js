import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogService'
import Notification from './Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'

const UserPage = ({ setUser, username }) => {
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

  return (
    (
      <div>
        <h2>blogs</h2>

        <Notification message = {message} />

        {username} logged in

        <button onClick={ handleLogout }>logout</button>

        <div style={ hideWhenVisible }>
          <button onClick={ () => setFormVisible(true) }>new Note</button>
        </div>

        <BlogForm
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          setBlogs={setBlogs}
          setMessage={setMessage}
          blogs={blogs}
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
              />
            )
        }
      </div>
    )
  )
}

BlogForm.propTypes = {
  setFormVisible: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default UserPage