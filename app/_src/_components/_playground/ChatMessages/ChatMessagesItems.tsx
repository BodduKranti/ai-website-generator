import React from 'react'
import { chatMessagesitem } from '../Playgroundmainsection'

const ChatMessagesItems = ({ role, content }: chatMessagesitem) => {
    return (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg max-w-[80%] text-black ${role === 'user' ? 'bg-gray-100' : 'bg-gray-300'}`}>
                {content || ''}
            </div>
        </div>
    )
}

export default ChatMessagesItems