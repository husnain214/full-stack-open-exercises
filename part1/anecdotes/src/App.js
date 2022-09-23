import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Anecdote = ({text}) => <p>{text}</p>

const Votes = ({value}) => <p>has {value} votes</p>

const Button = ({text, clickFunc}) => <button onClick = {clickFunc}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    setMaxVotes(votes.indexOf(Math.max(...votes)))
  }
  
  const updateVotes = () => {
    let newVotes = [...votes]

    newVotes[selected]++

    setVotes(newVotes)
  }

  return (
    <div>
      <Heading text = "anecdote of the day" />

      <Anecdote text = {anecdotes[selected]} />
      <Votes value = {votes[selected]} />

      <Button text = "vote" clickFunc={updateVotes} />
      <Button text = "next anecdote" clickFunc={nextAnecdote} />

      <Heading text = "anecdote with most votes" />

      <Anecdote text = {anecdotes[maxVotes]} />
      <Votes value = {votes[maxVotes]} />
    </div>
  )
}

export default App