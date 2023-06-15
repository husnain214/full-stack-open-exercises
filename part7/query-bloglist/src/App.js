import { useState, useEffect } from 'react'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import UserPage from './components/UserPage'

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setConfig(user.token)
    }
  }, [])

  return (
    <>
      {user === null
        ? <LoginForm setUser = {setUser} />
        : <UserPage setUser = {setUser} user = {user} />
      }
    </>
  )
}

export default App
