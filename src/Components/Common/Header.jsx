// src/components/Header.jsx
import React, { useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import { useHistoryToggle } from '../../Contexts/HistoryContext'; // Adjust the import path as necessary

const Header = ( ) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearchTerm, setHistorySearchTerm] = useState('');   

  const {setIsHistoryOpen,isHistoryOpen} = useHistoryToggle(); // Assuming you have a context for history toggle
  
  
  const buttonRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    // Check local storage for theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);


  useEffect(() => {
    if (isHistoryOpen) {
      gsap.fromTo(inputRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }
      );
    } else {
      gsap.fromTo(buttonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }
      );
    }
  }, [isHistoryOpen]);

  const handleToggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };


  const handleHistoryInputChange = (event) => {
    const value = event.target.value;
    setHistorySearchTerm(value);
    // You can add logic here to filter history based on 'value'
    // For example, trigger a search in a parent component if needed,
    // or update a global state for history filtering.
    console.log("History search input:", value);
  };


  const handleHistoryButtonClick = () => {
    setIsHistoryOpen(!isHistoryOpen);
    toggleHistory(!isHistoryOpen); // Toggle history state in context
    if (!isHistoryOpen) {
      inputRef.current.focus(); // Focus on input when opening history
    } else {
      inputRef.current.blur(); // Blur input when closing history
    }
  }
  

  return (
    <header className="flex justify-between items-center p-4 bg-bg border-b border-primary text-text transition-colors duration-300 ease-in-out">
      {/* History Button */}
      
      <div className="flex items-center w-8 ">
       { !isHistoryOpen ? <><button
          ref={buttonRef}
          onClick={() => handleHistoryButtonClick()}
          className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors duration-200 border-black border-2"
          aria-label="Search History"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.42C9.44 19.34 11.13 20 13 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
          </svg>
          <span className="font-handlee">History</span>
        </button> 
        
        </> : <> 
        <input
          ref={inputRef}
          type="text"
          placeholder="Search history..."
          value={historySearchTerm}
          onChange={handleHistoryInputChange}
          onBlur={() => setIsHistoryOpen(false)}
          className="p-2 rounded-md bg-transparent border border-secondary focus:outline-none focus:ring-2 focus:ring-primary placeholder-text opacity-70 transition-colors duration-200 font-handlee"
          aria-label="Search chat history"
        />

        </>}
      </div>

      {/* Bot Name */}
      <div className="text-center">
        <h1 className="font-serifAncizar text-3xl font-bold text-primary">Is it Taboo?</h1>
        <p className="font-handlee text-sm text-text opacity-80 mt-1">Powered by Gemini</p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center">
        <button
          onClick={handleToggleDarkMode}
          className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors duration-200"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25c-4.557 0-8.25-3.693-8.25-8.25S7.443 3.75 12 3.75s8.25 3.693 8.25 8.25-3.693 8.25-8.25 8.25zM12 6.75c-2.899 0-5.25 2.351-5.25 5.25s2.351 5.25 5.25 5.25 5.25-2.351 5.25-5.25-2.351-5.25-5.25-5.25z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zM11 5h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/>
            </svg>
          )}
          <span className="font-handlee">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;