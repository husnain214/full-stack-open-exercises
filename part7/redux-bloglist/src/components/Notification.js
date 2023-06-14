import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  return <p>{message}</p>
}

export default Notification
