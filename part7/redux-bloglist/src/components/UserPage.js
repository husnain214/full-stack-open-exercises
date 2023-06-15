import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Notification from './Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { intializeBlogs, createBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const UserPage = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const [formVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()

  const hideWhenVisible = { display: formVisible ? 'none' : '' }

  useEffect(() => {
    dispatch(intializeBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog))

    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} has been added`, 3000))
    setFormVisible(false)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <div style={hideWhenVisible}>
        <button onClick={() => setFormVisible(true)}>new Blog</button>
      </div>
      <BlogForm
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        createBlog={addBlog}
      />
      {blogs.length === 0
        ? '...'
        : [...blogs]
            .sort((first, second) => second.likes - first.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                user={user}
              />
            ))}
    </div>
  )
}

BlogForm.propTypes = {
  formVisible: PropTypes.bool.isRequired,
  setFormVisible: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default UserPage
