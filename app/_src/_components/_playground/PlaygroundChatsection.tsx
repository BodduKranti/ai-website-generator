import React, { FC } from 'react'
import { chatMessagesitem } from './Playgroundmainsection'
import ChatMessagesList from './ChatMessages/ChatMessagesList'
import ChatMessageFooter from './ChatMessages/ChatMessageFooter'

interface chatMessagesprops {
    msg: chatMessagesitem[],
    onSend: (values: any) => void,
    loading: boolean
}

const PlaygroundChatsection: FC<chatMessagesprops> = ({ msg, onSend, loading }) => {
    return (
        <div className='w-96 h-full shadow p-4 flex flex-col'>
            <ChatMessagesList msgList={msg} loading={loading} />

            {/* Footer input */}
            <ChatMessageFooter onSend={onSend} loading={loading} />
        </div>
    )
}

export default PlaygroundChatsection