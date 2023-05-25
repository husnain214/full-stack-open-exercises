import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('')

  const dispatch = useDispatch()

  const handleOnSubmit = event => {
    event.preventDefault() 
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotify(newAnecdote))
    setNewAnecdote('')

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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