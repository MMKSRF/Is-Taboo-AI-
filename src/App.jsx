// import Loading from "./Components/Loading";

import Main from "./Pages/Main";
import Headers from "./Components/Common/Header";
import { HistoryToggleProvider , HistoryManagerContextProvider } from "./Contexts/HistoryContext";
import { ChatContextProvider } from "./Contexts/ChatContex";


function App() {
  return(
    <>

    <ChatContextProvider>

      <HistoryToggleProvider>

          <HistoryManagerContextProvider>
            <div className="flex h-screen flex-col bg-bg text-text">
            <Headers />
            <Main />
            </div>
          </HistoryManagerContextProvider>

        
      
      </HistoryToggleProvider>

    </ChatContextProvider>



    </>
  )
}

export default App;