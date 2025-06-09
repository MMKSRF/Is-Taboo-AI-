import { createContext, useState, useContext} from "react"

const BodyContext = createContext();

export default function GeneralFront({children}) {
    const [isBodyTextOpen, setIsBodyTextOpen] = useState(false);
  return (
    <BodyContext.Provider value={{
        isBodyTextOpen, 
        setIsBodyTextOpen
    }}>
        {children}
    </BodyContext.Provider>
  )
}


export function useBodyContext() {
    return useContext(BodyContext);
}
