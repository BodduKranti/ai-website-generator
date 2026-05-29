'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface GenerateWebsiteStates {
    frameData: any,
    setFrameData: Dispatch<SetStateAction<any>>
}


export const GetFrameDetailscontext = createContext<GenerateWebsiteStates>({
    frameData: {},
    setFrameData: () => { }
})

export const GetFrameDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [frameData, setFrameData] = useState<any>()
    return (
        <GetFrameDetailscontext.Provider value={{ frameData, setFrameData }}>
            {children}
        </GetFrameDetailscontext.Provider>
    )
}

export const useGetFrameDetails = () => useContext(GetFrameDetailscontext)