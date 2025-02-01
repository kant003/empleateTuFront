import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
interface CursorProgressContextType{
    cursorProgress: boolean
    setCursorProgress: Dispatch<SetStateAction<boolean>>
}
const CursorProgressContext = createContext<CursorProgressContextType>({
    cursorProgress: false,
    setCursorProgress: () => {}
})

interface CursorProgressProviderWrapperProps {
    children: ReactNode
}
function CursorProgressProviderWrapper({children}:CursorProgressProviderWrapperProps){
    const [cursorProgress, setCursorProgress] = useState(false)

    return (
        <CursorProgressContext.Provider value={{cursorProgress, setCursorProgress}}>
            {children}
        </CursorProgressContext.Provider>
    )
}

export {CursorProgressContext, CursorProgressProviderWrapper}