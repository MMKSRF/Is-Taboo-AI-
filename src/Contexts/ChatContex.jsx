import { useState, createContext, useContext, useRef } from 'react';

const ChatContext = createContext();

// This helper function gets the session ID from local storage.
// If one doesn't exist, it creates a new one and saves it.
// This is the key to making sure every request has a session ID.
const getSessionId = () => {
  let sessionId = localStorage.getItem('abelSessionId');
  if (!sessionId) {
    // Generate a new unique ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    // Save it in the browser so we can use it again for the next message
    localStorage.setItem('abelSessionId', sessionId);
    console.log("New Session ID Created:", sessionId); // For debugging
  }
  return sessionId;
};


export function ChatContextProvider({ children }) {
  const [messages, setMessages] = useState([]);
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
    
    const aiMessageId = Date.now() + 1;
    const aiPlaceholder = { 
      id: aiMessageId, 
      text: '', 
      isUser: false 
    };
    
    setMessages(prev => [...prev, userMessage, aiPlaceholder]);
    
    const question = inputValue;
    setInputValue('');

    try {
      // --- CRITICAL FIX AREA ---
      // 1. Get the session ID right before sending the message.
      const sessionId = getSessionId();

      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. Make sure the body is a JSON string that includes BOTH the question AND the sessionId.
        body: JSON.stringify({ 
          question: question,
          sessionId: sessionId 
        }),
      });
      // --- END OF CRITICAL FIX ---

      if (!response.ok) {
        // The 400 error will be caught here.
        throw new Error(`Network error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: msg.text + chunk } : msg
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: "Sorry, I encountered an error." } : msg
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
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  return context;
}