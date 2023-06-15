import { useState } from 'react'

import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { addUser as setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username, password)

    try {
      dispatch(setUser({ username, password }))

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

      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit" id="log-in-button">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
