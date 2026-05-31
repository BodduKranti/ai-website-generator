'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface GenerateWebsiteStates {
    frameData: any,
    setFrameData: Dispatch<SetStateAction<any>>,
    selectedEl: any,
    setSelectedEl: Dispatch<SetStateAction<any>>
}


export const GetFrameDetailscontext = createContext<GenerateWebsiteStates>({
    frameData: {},
    setFrameData: () => { },
    selectedEl: {},
    setSelectedEl: () => { }
})

export const GetFrameDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [frameData, setFrameData] = useState<any>()
    const [selectedEl, setSelectedEl] = useState<HTMLElement>()
    return (
        <GetFrameDetailscontext.Provider value={{
            frameData,
            setFrameData,
            selectedEl,
            setSelectedEl
        }}>
            {children}
        </GetFrameDetailscontext.Provider>
    )
}

export const useGetFrameDetails = () => useContext(GetFrameDetailscontext)