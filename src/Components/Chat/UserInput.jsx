import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function UserInput({ userMessage, setUserMessage, handleSend, isHistoryOpen }) {
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 600) + 'px';
    }
  }, [userMessage]);

  // Animate horizontal shift based on isHistoryOpen
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: isHistoryOpen ? 250 : 0, // shift right 250px when open
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isHistoryOpen]);

  return (
    <div ref={containerRef} className="w-full py-3 bg-bg">
      <div className="relative max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          rows={1}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full resize-none px-4 py-3 pr-12 bg-transparent border border-secondary text-text placeholder-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all font-handlee overflow-hidden"
          style={{ maxHeight: '600px' }}
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors font-bold text-xl"
          aria-label="Send message"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}