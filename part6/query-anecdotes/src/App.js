import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotifyDispatch } from './notifyContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, incrementVote } from './requests'

const App = () => {
  const notifyDispatch = useNotifyDispatch()
  const queryClient = useQueryClient()
  const voteMutation = useMutation(incrementVote)

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    })

    notifyDispatch({ type: 'createNotify', payload: 'You voted ' + anecdote.content })
    setTimeout(() => {
      notifyDispatch({type: 'removeNotify'})
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })

  if(result.isLoading) {
    return <div>anecdote service not available due to problems with the server</div>
  }

  const anecdotes = result.data

  return (
    <>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
