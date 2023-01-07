import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import Notification from './components/Notification'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong Credentials')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) {
    return (
      <>
        <h1>Log in to application</h1>

        <Notification message={errorMessage} />

        <form onSubmit={ handleLogin }>
          <div>
            <label htmlFor='username'>username</label>
            <input 
              type='text'
              name='username'
              value={ username }
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            <label htmlFor='password'>password</label>
            <input 
              type='text'
              name='password'
              value={ password }
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type='submit'>login</button>
        </form>
      </>
    )   
  }

  return (
    <div>
      <h2>blogs</h2>

      {user.name} logged in

      <button onClick={ handleLogout }>logout</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
