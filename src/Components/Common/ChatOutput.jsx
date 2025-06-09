// This is the commen chat for the user input and the bot output so this must be reusebel 
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ChatOutput = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Conversation history object
  const conversationHistory = {
    welcome: [
      { user: "Hi there!", ai: "Hello! Welcome to our service. How can I help you?" },
      { user: "What can you do?", ai: "I can answer questions, provide information, and help with tasks!" }
    ],
    help: [
      { user: "I need help", ai: "Sure, I'd be happy to assist. What do you need help with?" }
    ]
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: getAIResponse(inputValue),
        isUser: false
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 600);
  };

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check conversation history for matches
    for (const [key, dialogs] of Object.entries(conversationHistory)) {
      for (const dialog of dialogs) {
        if (dialog.user.toLowerCase() === lowerInput) {
          return dialog.ai;
        }
      }
    }
    
    // Default responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hi there! How can I help you today?";
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?";
    }
    
    return "I understand. Could you elaborate on that?";
  };

  // GSAP animations
  useEffect(() => {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.lastChild;
      if (lastMessage) {
        gsap.fromTo(lastMessage,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };









  return (
    <div className="flex flex-col h-full w-full mx-auto  from-indigo-50 to-cyan-50 rounded-2xl shadow-xl overflow-hidden">
      {/* Conversation Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <div className="flex items-center space-x-3">
         
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth"
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-3xl p-4 ${
              message.isUser
                ? 'bg-indigo-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 shadow-md rounded-bl-none'
            }`}>
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





// <div className="border-t border-gray-200 p-4 bg-white">
//         <div className="flex items-center space-x-2">
//           <textarea
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//             className="flex-1 border border-gray-300 rounded-2xl px-4 text-text py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
//             rows={1}
//           />
//           <button
//             onClick={handleSend}
//             className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95"
//           >
//             Send
//           </button>
//         </div>
        
//         {/* History Quick Access */}
//         <div className="mt-3 flex flex-wrap gap-2">
//           {Object.keys(conversationHistory).map((key) => (
//             <button
//               key={key}
//               onClick={() => setInputValue(conversationHistory[key][0].user)}
//               className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
//             >
//               {key}
//             </button>
//           ))}
//         </div>
//       </div> 
