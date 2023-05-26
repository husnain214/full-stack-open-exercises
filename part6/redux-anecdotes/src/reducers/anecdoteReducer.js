import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newVote(state, action){
      return state.map(anecdote => {
        const changedAnecdote = { 
          ...anecdote, 
          votes: anecdote.votes + 1
        }

        return anecdote.id === action.payload
        ? changedAnecdote 
        : anecdote
      })
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) { 
      return action.payload    
    }
  }
})

export const { newVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))  
}}

export const appendAnecdote = newAnecdote => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(newAnecdote)
    dispatch(createAnecdote(anecdote))
  }
}

export const incrementVotes = anecdote => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(anecdote)
    dispatch(newVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer