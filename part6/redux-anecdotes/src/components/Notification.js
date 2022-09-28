import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={notification.message ? style : null}>
			{notification.message}
    </div>
  )
}

export default Notification
