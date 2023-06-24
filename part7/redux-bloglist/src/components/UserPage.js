import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Route, Routes, useMatch } from 'react-router-dom'
import UserList from './UserList'
import { Link } from 'react-router-dom'
import User from './User'
import Notification from './Notification'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { intializeBlogs, createBlog } from '../reducers/blogReducer'
import { logout } from '../reducers/userReducer'
import userService from '../services/userService'

const UserPage = ({ user }) => {
  const [users, setUsers] = useState([])
  const [formVisible, setFormVisible] = useState(false)

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeBlogs())

    const intializeUsers = async () => {
      const data = await userService.getAll()

      setUsers(data)
    }

    intializeUsers()
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog))

    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} has been added`, 3000))
    setFormVisible(false)
  }

  const userMatch = useMatch('/users/:id')  
  const selectedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')  
  const selectedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    backgroundColor: 'gray',
    padding: '.5rem 1rem'
  }

  return (
    <div>
      <nav style={navStyle}>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>

        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </nav>
      <h2>blog app</h2>
      <Notification />


      <Routes>
        <Route path='/' element={<BlogList setFormVisible={setFormVisible} formVisible={formVisible} addBlog={addBlog} user={user} />} />
        <Route path='/blogs/:id' element={<Blog user={user} blog={selectedBlog} />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<User user={selectedUser} />} />
      </Routes>
    </div>
  )
}

BlogForm.propTypes = {
  formVisible: PropTypes.bool.isRequired,
  setFormVisible: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default UserPage
