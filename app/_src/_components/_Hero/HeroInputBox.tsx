import { Button } from '@/components/ui/button'
import { ArrowUp, ImagePlusIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface HeroInputBoxprops {
    userInput: any,
    setUserInput: Dispatch<SetStateAction<any>>
}

const HeroInputBox = ({ userInput, setUserInput }: HeroInputBoxprops) => {
    return (
        <div className='w-full max-w-2xl border p-5 rounded-2xl'>
            <textarea
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                placeholder='Describe your page design'
                className='w-full h-24 focus:outline-none focus:ring-0 resize-none'
            />
            <div className='w-full flex justify-between  items-center'>
                <Button variant={'ghost'}><ImagePlusIcon className='w-4 h-4' /></Button>
                <Button variant={'default'}><ArrowUp className='w-4 h-4' /></Button>
            </div>
        </div>
    )
}

export default HeroInputBox