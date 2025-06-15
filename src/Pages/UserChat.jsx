import React, { useEffect, useRef } from 'react';
import ChatWelcome from '../Components/Chat/ChatWelcome';
import ChatOutput from '../Components/Common/ChatOutput';
import { useChatContext } from '../Contexts/ChatContex';
import gsap from 'gsap';

export default function UserChat() {
  const { messages } = useChatContext();
  const taggle = messages.length === 0;

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      );
    }
  }, [taggle]); // trigger animation when `taggle` changes

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center h-full w-full"
    >
      {taggle ? (
        <ChatWelcome show={true} />
      ) : (
        <div className="flex flex-col h-full justify-end items-start w-full md:w-3/5 p-0 md:p-4 bg-bg">
          <ChatOutput />
        </div>
      )}
    </div>
  );
}