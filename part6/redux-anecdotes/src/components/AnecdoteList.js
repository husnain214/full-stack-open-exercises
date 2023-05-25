import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { removeNotification, voteNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter === 'NO_FILTER') {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(newVote(id))
    dispatch(voteNotify(content))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList