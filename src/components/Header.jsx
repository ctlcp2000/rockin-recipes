import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { handleNotifications } from '../hooks/handleNotifications.js'
import slug from 'slug'

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
    // TODO put notifications in their own component and build popup
    return (
      <div>
        <h1>Welcome To Rockin Recipes!</h1>
        Logged in as <User id={sub} />
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button> 
        {notifications.map((recipe) => (
            <Link to={`/recipes/${recipe._id}/${slug(recipe.title)}`}>
              <h3>Click here to see the new recipe: {recipe.title}</h3>
            </Link>
        ))}
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
