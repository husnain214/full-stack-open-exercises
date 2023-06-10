import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../notifyContext'

const AnecdoteForm = () => {
  const [notifiyContext, notifyDispatch]  = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const createMutation = useMutation(createAnecdote)
  const getId = () => (100000 * Math.random()).toFixed(0)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    createMutation.mutate({
      id: getId(),
      content,
      votes: 0
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
      onError: (failed) => notifyDispatch({
        type: 'createNotify',
        payload: failed.response.data.error
      })
    })

    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
