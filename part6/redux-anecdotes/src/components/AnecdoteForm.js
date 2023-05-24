import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('')

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleOnSubmit = event => {
    event.preventDefault() 
    dispatch(createAnecdote(newAnecdote))
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