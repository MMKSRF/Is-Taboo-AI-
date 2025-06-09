// HistoryToggleContext.js
import { createContext, useState, useContext } from "react";



const HistoryToggleContext = createContext();
const HistoryManagerContext = createContext();

function HistoryToggleProvider({ children }) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <HistoryToggleContext.Provider value={{ isHistoryOpen, setIsHistoryOpen }}>
      {children}
    </HistoryToggleContext.Provider>
  );
}

function useHistoryToggle() {
  return useContext(HistoryToggleContext);
}



function HistoryManagerContextProvider({ children }) {
  


  // Animate on mount



 

  return (
    <HistoryManagerContext.Provider value={{
    
      
    }}>
      {children}
    </HistoryManagerContext.Provider>
  );
} 

function useHistoryManager() {
  return useContext(HistoryManagerContext);
}








export { HistoryToggleProvider, useHistoryToggle , HistoryManagerContextProvider, useHistoryManager };