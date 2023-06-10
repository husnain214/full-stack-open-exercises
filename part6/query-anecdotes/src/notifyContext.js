import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'createNotify':
      return action.payload
    case 'removeNotify':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notifiyContent, notifyDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notifiyContent, notifyDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotifyValue = () => {
  const contentAndDispatch = useContext(NotificationContext)
  return contentAndDispatch[0]
}

export const useNotifyDispatch = () => {
  const contentAndDispatch = useContext(NotificationContext)
  return contentAndDispatch[1]
}


export default NotificationContext
