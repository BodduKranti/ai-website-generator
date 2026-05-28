import React, { useState } from 'react'
import CommonButton from '../../_Field/CommonButton'
import { ArrowUp, Loader2Icon } from 'lucide-react'

const ChatMessageFooter = ({ onSend, loading }: { onSend: (value: any) => void, loading: boolean }) => {
    const [input, setInput] = useState<any>('')
    const handleSend = () => {
        if (!input?.trim()) return;
        onSend(input);
        setInput('')
    }
    return (
        <div className='border-t py-3 flex item-center gap-2'>
            <textarea
                value={input}
                onChange={(e: any) => {
                    console.log(e.target.value)
                    setInput(e.target.value)
                }}
                placeholder='Describe your webiste design idea!'
                className='flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2'
            />
            <CommonButton
                buttonText=''
                icon={loading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : <ArrowUp className='w-4 h-4' />}
                varient='default'
                className={'w-auto!'}
                onClick={handleSend}
            />
        </div>
    )
}

export default ChatMessageFooter