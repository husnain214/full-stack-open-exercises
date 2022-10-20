const Notification = ({ message, status }) => {
    if (message === null) return null
    console.log(message, status ? "success" : "error")
    return (
      <div className={status ? "success" : "error"}>
        {message}
      </div>
    )
}

export default Notification