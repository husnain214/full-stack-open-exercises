import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('')

  const dispatch = useDispatch()

  const handleOnSubmit = async event => {
    event.preventDefault() 

    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`You created ${newAnecdote}`, 5000))

    setNewAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div><input 
          onChange={({ target }) => setNewAnecdote(target.value)} 
          value={newAnecdote}
        /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm