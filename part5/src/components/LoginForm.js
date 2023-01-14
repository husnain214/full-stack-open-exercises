import { useState } from 'react'

import blogService from '../services/blogService'
import Notification from './Notification'
import loginService from '../services/loginService'

const LoginForm = ({ setUser }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

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
    
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (error) {
          setErrorMessage('Wrong username or password')
    
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }

    return (
      <>
        <h1>Log in to application</h1>

        <Notification message = {errorMessage} />

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
              type='password'
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

export default LoginForm