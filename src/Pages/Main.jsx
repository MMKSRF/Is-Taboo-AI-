
import History from '../Components/Chat/History';
import UserInput from '../Components/Chat/UserInput';
import Loading from '../Components/Common/Loading';
import { useHistoryToggle } from '../Contexts/HistoryContext';

import UserChat from './UserChat';

export default function Main() {

const { isHistoryOpen } = useHistoryToggle();

  return (


   

      <div className="bg-bg flex h-full  gap-4 ">
          {/* <Loading /> */}
         {isHistoryOpen && <History />}
          <div className="relative flex-1 flex flex-col mr-4">
            {/* Chat area with padding bottom so input doesn’t overlap */}
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <UserChat />
            </div>

            {/* Fixed input at bottom */}
            <div className=" w-full border-t border-secondary bg-bg p-2 ">
              <UserInput />
            </div>
          </div>
      </div>


  
   
    
  );
}