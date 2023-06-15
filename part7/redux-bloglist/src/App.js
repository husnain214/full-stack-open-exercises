import { useState, useEffect } from 'react'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import UserPage from './components/UserPage'
import { useDispatch, useSelector } from 'react-redux'
import { intializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(intializeUser())
  }, [])

  return (
    <>
      {user === null ? (
        <LoginForm />
      ) : (
        <UserPage user={user} />
      )}
    </>
  )
}

export default App
