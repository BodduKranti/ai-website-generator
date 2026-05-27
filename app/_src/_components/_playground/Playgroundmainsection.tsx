'use client'
import PlaygroundChatsection from './PlaygroundChatsection'
import PlaygroundWebsiteDesignsection from './PlaygroundWebsiteDesignsection'
import PlaygroundSettingsection from './PlaygroundSettingsection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { routesApiurl } from '../../types'
import { useEffect, useState } from 'react'

export type chatMessagesitem = {
    role: string,
    content: any
}

export type Frame = {
    id: any,
    frameId: string,
    designCode: any,
    projectId: string,
    chatMessages: chatMessagesitem[]
}

const Playgroundmainsection = () => {
    const { projectid } = useParams()
    const params = useSearchParams()
    const frameId = params.get('frameid')

    const [frameDetails, setFrameDetails] = useState<Frame>()

    // Get Frame Details
    const getFrameDetails = async () => {
        const details = await axios.get(`${routesApiurl.frameGetDetailsURL}?frameId=${frameId}&projectId=${projectid}`)
        console.log('Frame Details', details.data)
        setFrameDetails(details.data)
    }

    useEffect(() => {
        frameId && getFrameDetails()
    }, [frameId])

    console.log('frameDetails', frameDetails)

    const sendMessage = (vlaues: string) => {
        console.log('sendmessge values', vlaues)
    }

    return (
        <div className='w-full flex h-[calc(100vh-60px)]'>
            {/* Chat Section */}
            <PlaygroundChatsection
                msg={frameDetails?.chatMessages ?? []}
                onSend={(input: string) => sendMessage(input)}
            />

            {/* Website Design Section */}
            <PlaygroundWebsiteDesignsection />

            {/* Setting Section */}
            <PlaygroundSettingsection />
        </div>
    )
}

export default Playgroundmainsection