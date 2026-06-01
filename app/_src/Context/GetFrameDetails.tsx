'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface GenerateWebsiteStates {
    frameData: any,
    setFrameData: Dispatch<SetStateAction<any>>,
    selectedEl: any,
    setSelectedEl: Dispatch<SetStateAction<any>>,
    newClass: any,
    setNewClass: Dispatch<SetStateAction<any>>
}


export const GetFrameDetailscontext = createContext<GenerateWebsiteStates>({
    frameData: {},
    setFrameData: () => { },
    selectedEl: {},
    setSelectedEl: () => { },
    newClass: {},
    setNewClass: () => { }
})

export const GetFrameDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [frameData, setFrameData] = useState<any>()
    const [selectedEl, setSelectedEl] = useState<HTMLElement>()
    const [newClass, setNewClass] = useState<any>('')
    return (
        <GetFrameDetailscontext.Provider value={{
            frameData,
            setFrameData,
            selectedEl,
            setSelectedEl,
            newClass,
            setNewClass
        }}>
            {children}
        </GetFrameDetailscontext.Provider>
    )
}

export const useGetFrameDetails = () => useContext(GetFrameDetailscontext)