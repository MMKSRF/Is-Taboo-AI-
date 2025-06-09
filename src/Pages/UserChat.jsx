import React from 'react'
import ChatWelcome from '../Components/Chat/ChatWelcome'
import ChatOutput from '../Components/Common/ChatOutput'

export default function UserChat() {

  if(false){
  return (
    <div className='flex justify-center items-center h-full'>
      <ChatWelcome show={true} />
    </div>
  )}else{
    return (
      <div className='flex flex-col h-full justify-end items-start w-3/5 p-4 bg-bg'>

        <ChatOutput/>
      </div>
    )
  }
}
