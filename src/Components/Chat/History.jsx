

import { useHistoryToggle } from '../../Contexts/HistoryContext';
import gsap from 'gsap';
import  { useEffect,useRef } from 'react';

import { FiX } from 'react-icons/fi';
import './History.css';

export default function History() {


  const sidebarRef = useRef(null);
  const isResizing = useRef(null);


  const { setIsHistoryOpen } = useHistoryToggle();
  


  // const {isHistoryOpen} = useHistoryToggle();



    useEffect(() => {
    const el = sidebarRef.current;

    gsap.fromTo(
      el,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = Math.min(Math.max(e.clientX, 150), 600);
      el.style.width = `${newWidth}px`;
    };

    const stopResizing = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);


  const historyClose = () => {
    console.log('Closing history sidebar');
    const el = sidebarRef.current;
   
      gsap.to(el, {
        x: -200,
        opacity: 0.3,
        duration: 0.3,
        ease: 'power1.in',
        onComplete: () => {
          setIsHistoryOpen(false);
        },
      });
    
  };



  
  

  return (
    <div ref={sidebarRef} className="custom-sidebar text-text bg-history absolute top-0 left-0 bottom-0 z-10">
      <div className="pl-4 py-[0.7rem]  border-b-2 border-primary hover:opacity-90">
        <FiX className="text-blue-500 w-6 h-6 cursor-pointer hover:text-blue-400 active:text-blue-600" onClick={historyClose} />
      </div>
      <p className="text-text p-4 ">History Sidebar</p>
      <div
        className="resizer"
        onMouseDown={() => {
          isResizing.current = true;
        }}
      />
    </div>
  );
}