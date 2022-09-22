const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style} className={isSuccess ? "success" : "error"}>
		{message}
    </div>
  )
}

export default Notification
