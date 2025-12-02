import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'
export function useChat() {
  const { socket } = useSocket()
  const [messages, setMessages] = useState([])
  function receiveMessage(message) {
    setMessages((messages) => [...messages, message])
  }
  useEffect(() => {
    socket.on('chat.message', receiveMessage)
    return () => socket.off('chat.message', receiveMessage)
  }, [])
  async function sendMessage(message) {
      socket.emit('chat.message', 'public', message)
    
  }
  return { messages, sendMessage }
}
