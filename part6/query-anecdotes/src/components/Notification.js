import { useNotifyValue } from '../notifyContext'

const Notification = () => {  
  const notificationContent = useNotifyValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notificationContent}
    </div>
  )
}

export default Notification
