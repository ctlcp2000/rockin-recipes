import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function handleNotifications() {
  const { socket } = useSocket()
  const [notifications, setNotifications] = useState([])

  function receiveNotification(notification) {
    setNotifications((notifications) => [...notifications, notification])
  }

  function dismissNotification(){
    if (notifications.length > 0){
    setNotifications(() => [])
    }
  }

  useEffect(() => {
    socket.on('notification.message', receiveNotification)
    return () => socket.off('notification.message', receiveNotification)
  }, [])
  
  return { notifications, dismissNotification }
}
