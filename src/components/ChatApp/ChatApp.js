import './ChatApp.css'
import { createContext, useState } from 'react'
import ChatMessages from './ChatMessages'
import List from './List'

const ChatAppContext = createContext()
export { ChatAppContext }

const ChatApp = () => {
  const [chatId, setChatId] = useState(null)
  const [otherUser, setOtherUser] = useState(null)

  return (
    <ChatAppContext.Provider
      value={{ chatId, setChatId, otherUser, setOtherUser }}
    >
      <div className='container-chat-app'>
        <List />
        <ChatMessages />
      </div>
    </ChatAppContext.Provider>
  )
}
export default ChatApp
