// This is the common chat for the user input and the bot output so this must be reusable 
import { useEffect } from 'react';
import { useChatContext } from '../../Contexts/ChatContex';
import gsap from 'gsap';

const ChatOutput = () => {
  const {
    messages,
    
  
    messagesEndRef,
    chatContainerRef,
  
  } = useChatContext(); // ✅ Fixed: added ()

  // Animate the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      const children = chatContainerRef.current.children;
      if (children.length > 1) {
        const lastMessage = children[children.length - 2]; // before messagesEndRef
        gsap.fromTo(
          lastMessage,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1)' }
        );
      }
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[73vh] w-full mx-auto from-indigo-50 to-cyan-50  rounded-2xl shadow-xl overflow-hidden">
      {/* Conversation Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 opacity-50">
        {/* Optional: Add a title or icon here */}
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth"
      >
        {messages.map((message) => (          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl p-4 ${
                message.isUser
                  ? 'bg-secondary text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-md rounded-bl-none'
              }`}
            >
              <div className="font-semibold mb-1">
                {message.isUser ? 'You' : 'Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{message.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
     








    








    </div>
  );
};

export default ChatOutput;











