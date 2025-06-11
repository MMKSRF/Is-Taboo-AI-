import { useState, createContext  ,useContext  , useRef } from 'react';


const ChatContext = createContext();

export function ChatContextProvider({ children }) {


     const [messages, setMessages] = useState([
    // { id: 1, text: "Hello! How can I assist you today?", isUser: false },
    // { id: 2, text: "Hello! How can I assist you today?", isUser: true },
    // { id: 3, text: "Hello! How can I assist you today?", isUser: false },
    // { id: 4, text: "Hello! How can I assist you today?", isUser: true },
    
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  
const handleSend = async () => {
  if (!inputValue.trim()) return;

  const userMessage = {
    id: Date.now(),
    text: inputValue,
    isUser: true,
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');

  const id = Date.now() + 1;
  let partialText = '';
  let bufferedChunk = '';

  setMessages(prev => [...prev, { id, text: '', isUser: false }]);

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: inputValue }),
    });

    if (!response.ok) throw new Error("Network error");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';

    let lastUpdate = Date.now();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop(); // save the last unfinished line

      for (const line of lines) {
        const chunk = line.trim();
        if (!chunk) continue;

        bufferedChunk += chunk;

        // Throttle DOM updates: every 50ms
        const now = Date.now();
        if (now - lastUpdate > 50) {
          partialText += bufferedChunk;
          bufferedChunk = '';
          lastUpdate = now;

          setMessages(prev =>
            prev.map(msg =>
              msg.id === id ? { ...msg, text: partialText } : msg
            )
          );
        }
      }
    }

    // Final update
    partialText += bufferedChunk;
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, text: partialText } : msg
      )
    );
  } catch (err) {
    console.error(err);
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, text: "Error getting AI response." } : msg
      )
    );
  }
};



  
  
  

      
      
      
      
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };
      
      
      
      return (
        <ChatContext.Provider value={{
        messages,
        setMessages,
        inputValue,
        setInputValue,
        handleSend,
        messagesEndRef,
        chatContainerRef,
        handleKeyPress
    }}>
      {children}
    </ChatContext.Provider>
  )
}


export function useChatContext() {
  const context = useContext(ChatContext);
  
  return context;
}


  // const  handleSend = async () => {
  //   if (!inputValue.trim()) return;

  //   // Add user message
  //   const userMessage = {
  //     id: Date.now(),
  //     text: inputValue,
  //     isUser: true
  //   };
    
  //   setMessages(prev => [...prev, userMessage]);
  //   setInputValue('');
    
  //   // Simulate AI response after delay
  
  //     const aiMessage = {
  //       id: Date.now() + 1,
  //       text: await getAIResponse(inputValue),
  //       isUser: false
  //     };
  //     setMessages(prev => [...prev, aiMessage]);

  // };