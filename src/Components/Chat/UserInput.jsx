import { useChatContext } from "../../Contexts/ChatContex";

export default function UserInput() {


  // Auto resize textarea height
const {
  
    inputValue,
    setInputValue,
    handleSend,
    handleKeyPress
  } = useChatContext();





  return (
     <div  className="w-full py-3 bg-bg">
            <div className="relative max-w-3xl mx-auto">
              <textarea
             
                rows={1}
                value={inputValue}
                onKeyDown={handleKeyPress}
                onChange={(e) => setInputValue(e.target.value)}
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