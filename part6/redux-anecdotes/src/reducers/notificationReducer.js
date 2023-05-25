import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    voteNotify(state, action) {
      return `You voted ${action.payload}`
    },
    createNotify(state, action) {
      return `You created ${action.payload}`
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { voteNotify, createNotify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer