import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { handleNotifications } from '../hooks/handleNotifications.js'
import { Notification } from './Notification.jsx'


export function Header() {
  const [token, setToken] = useAuth()
  const { socket } = useSocket()

  const handleLogout = () => {
    socket.disconnect()
    setToken(null)
  }

  if (token) {
    const { sub } = jwtDecode(token)
    const { notifications, dismissNotification } = handleNotifications()
    return (
      <div>
        <h1>Welcome To Rockin Recipes!</h1>
        Logged in as <User id={sub} />
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button> 
        {(notifications.length > 0 && notifications[0].author != sub) && (
            <Notification 
                recipe={notifications[0]} 
                dismissNotification={dismissNotification} 
            />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome To Rockin Recipes!</h1>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
