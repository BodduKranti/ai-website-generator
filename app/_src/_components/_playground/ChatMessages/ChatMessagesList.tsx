import { FC } from "react"
import { chatMessagesitem } from "../Playgroundmainsection"
import ChatMessagesItems from "./ChatMessagesItems"

interface chatMessagesprops {
    msgList: chatMessagesitem[]
}

const ChatMessagesList: FC<chatMessagesprops> = ({ msgList }) => {
    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
            {
                msgList?.length === 0 ?
                    <p className='text=gray-400 text-center'>No Messages Yet</p> :
                    (
                        msgList.map((list: chatMessagesitem, index: number) => (
                            <ChatMessagesItems {...list} key={index} />
                        ))
                    )
            }
        </div>
    )
}

export default ChatMessagesList