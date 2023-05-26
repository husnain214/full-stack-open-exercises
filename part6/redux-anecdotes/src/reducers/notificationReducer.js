import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotify(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { createNotify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, duration) => {
  return dispatch => {
    dispatch(createNotify(content))
    
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration)
  }
} 