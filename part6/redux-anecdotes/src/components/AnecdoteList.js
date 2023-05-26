import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    console.log(state.anecdotes)

    if(state.filter === 'NO_FILTER') {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }

  return(
    <>
      {[...anecdotes].sort((prev, next) => next.votes - prev.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList