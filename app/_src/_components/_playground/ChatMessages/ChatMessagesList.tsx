import { FC } from "react"
import { chatMessagesitem } from "../Playgroundmainsection"
import ChatMessagesItems from "./ChatMessagesItems"

interface chatMessagesprops {
    msgList: chatMessagesitem[],
    loading: boolean
}

const ChatMessagesList: FC<chatMessagesprops> = ({ msgList, loading }) => {
    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
            {
                msgList?.length === 0 ?
                    <p className='text=gray-400 text-center'>No Messages Yet</p> :
                    (
                        msgList?.map((list: chatMessagesitem, index: number) => (
                            <ChatMessagesItems {...list} key={index} />
                        ))
                    )
            }
            {
                loading && <div className="w-full flex justify-center items-center py-5 gap-3">
                    <div className="animate-spin rounded-full w-8 h-8 border-t-2 border-b-2 border-zinc-800">
                    </div>
                    <span className="text-zinc-800">Generating code...</span>
                </div>
            }

        </div>
    )
}

export default ChatMessagesList