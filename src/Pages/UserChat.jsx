import React from 'react'
import ChatWelcome from '../Components/Chat/ChatWelcome'

export default function UserChat() {
  return (
    <div className='flex justify-center items-center h-full'>
      <ChatWelcome show={true} />
    </div>
  )
}
