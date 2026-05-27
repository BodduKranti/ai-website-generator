import React, { FC } from 'react'
import { chatMessagesitem } from './Playgroundmainsection'
import ChatMessagesList from './ChatMessages/ChatMessagesList'
import ChatMessageFooter from './ChatMessages/ChatMessageFooter'

interface chatMessagesprops {
    msg: chatMessagesitem[],
    onSend: (values: any) => void
}

const PlaygroundChatsection: FC<chatMessagesprops> = ({ msg, onSend }) => {
    return (
        <div className='w-96 h-full shadow p-4 flex flex-col'>
            <ChatMessagesList msgList={msg} />

            {/* Footer input */}
            <ChatMessageFooter onSend={onSend} />
        </div>
    )
}

export default PlaygroundChatsection