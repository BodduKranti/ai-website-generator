'use client'
import { useState } from 'react'
import HeroDescrptionText from './HeroDescrptionText'
import HeroInputBox from './HeroInputBox'
import HeroSuggestions from './HeroSuggestions'

const Hero = () => {

    const [userInput, setUserInput] = useState<any>('')
    console.log('userInput', userInput)
    return (
        <div className='mx-auto md:w-7xl w-full flex flex-col gap-4 justify-center items-center h-[80vh]'>
            {/* Header & Description */}
            <HeroDescrptionText />
            {/* Input box */}
            <HeroInputBox
                userInput={userInput}
                setUserInput={setUserInput}
            />
            {/* Suggestions list */}
            <HeroSuggestions setUserInput={setUserInput} />
        </div>
    )
}

export default Hero