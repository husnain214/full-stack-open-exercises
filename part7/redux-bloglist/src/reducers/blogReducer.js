import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    incrementLike(state, action) {
      const selectedBlog = state.find(blog => blog.id === action.payload)
      const updatedBlog = { ...selectedBlog, likes: selectedBlog.likes + 1 }

      return state.map(blog => blog.id === selectedBlog.id ? updatedBlog : blog)
    }
  }
})

const { newBlog, deleteBlog, setBlogs, incrementLike } = blogSlice.actions

export default blogSlice.reducer

export const intializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch(newBlog(createdBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(incrementLike(updatedBlog.id))
  }
}