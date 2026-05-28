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
    const [messages, setMessages] = useState<chatMessagesitem[]>([])
    const [generatedcode, setGeneratedcode] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
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

    const sendMessage = async (vlaues: string) => {
        setLoading(true)
        const assistent = { role: 'user', content: vlaues }
        setMessages((prev: chatMessagesitem[]) => [...prev, assistent])
        // frameDetails?.chatMessages?.push(assistent)
        // console.log('post frameDetails', frameDetails)
        // const aiPostresults = await axios.post(routesApiurl.aiModelURL, {
        //     messages: [assistent],
        // })


        const aiPostresults = await fetch(routesApiurl.aiModelURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [assistent]
            })
        });

        const reader = aiPostresults?.body?.getReader();
        const decoder = new TextDecoder();

        let response = '';
        let isCode = false
        while (true) {
            //@ts-ignore
            const { done, value } = await reader?.read();

            if (done) break;

            const text = decoder.decode(value, { stream: true });
            response += text

            // Api sending code 
            if (!isCode && response.includes('```html')) {
                isCode = true
                const index = response.indexOf('```html') + 7;
                const initialCodeChunk = response.slice(index)
                setGeneratedcode((prev: any) => prev + initialCodeChunk)
            } else if (isCode) {
                setGeneratedcode((prev: any) => prev + text)
            }

            console.log(text);


        }

        // after streaming 
        if (!isCode) {
            setMessages((prev: chatMessagesitem[]) => [...prev, {
                role: 'assistent',
                content: response
            }])
        } else {
            setMessages((prev: chatMessagesitem[]) => [...prev, {
                role: 'assistent',
                content: `Your code is ready`
            }])
        }

        setLoading(false)
        // setFrameDetails({})
        // console.log('aiPostresults', aiPostresults?.data)

        // const reader = aiPostresults.data.getReader()
        // console.log('aiPostresults.data.getReader()', reader)
    }


    console.log('messages', messages)
    console.log('generatedcode', generatedcode)

    return (
        <div className='w-full flex h-[calc(100vh-60px)]'>
            {/* Chat Section */}
            <PlaygroundChatsection
                msg={messages ?? []}
                onSend={(input: string) => sendMessage(input)}
                loading={loading}
            />

            {/* Website Design Section */}
            <PlaygroundWebsiteDesignsection />

            {/* Setting Section */}
            <PlaygroundSettingsection />
        </div>
    )
}

export default Playgroundmainsection