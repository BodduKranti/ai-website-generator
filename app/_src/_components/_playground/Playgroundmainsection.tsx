'use client'
import PlaygroundChatsection from './PlaygroundChatsection'
import PlaygroundWebsiteDesignsection from './PlaygroundWebsiteDesignsection'
import PlaygroundSettingsection from './PlaygroundSettingsection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { routesApiurl } from '../../types'
import { useEffect, useState } from 'react'
// import { useGetFrameDetails } from '../../Context/GetFrameDetails'
import { toast } from 'sonner'

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

const prompt = `userInput:{userInput}
Instructions:
Based on the user input, generte a complete HTML Tailwind Css mode
Do not add HTML head or titlte tag, just body
make it fully responsive.
Requirements:
1. if the user input isexplicitly asking to generate code, design, or HTML/CSS/JS output
   (e.g./ "Create a landing page", "Build a dashboard", "Generate HTML Tailwind CSS code"), Then:
- Generate a complete HTML Tailwind CSS code using Flowbite UI components.
- Use a modern desing with **blue as the primary color theme**.
- Only include the <body> content (do not add <head> or <title>)
- All primary components must match the theme color.
- Add proper padding and margin for each element.
- Components should be independent; do not connet them.
- Design must be fully responsive for all screen sizes.
- Use placeholders for all images according to light mode : https://t4.ftcdn.net/jpg/06/71/92/37/240_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg and dark mode
- Use the Following libraries/components where appropriate:
  - FontAwesome icons (fa fa-)
  - Flowbite UI components: buttons, modals, forms, tables, tabs,
     alerts, cards, dialogs, dropdowns, accordions, etc.
  - Chart.js for charts & graphs
  - Swiper.js for slider/carousels
  - Tippy.js for tooltips & popovers
- Include interactive components like modals, dropdowns, and accordions
- Ensure proper spacing, aligment, heirachy, and theme consistency
- Ensure chart are visually appealing and match the theme color
- Header menu options should be spread out and not connected.
- Do not include broken links.
- Do not add any extra text before or after the HTML code.

2. If the user input is **general text or greetings** 
    (e.g., "Hi", "Hello", "How are yr?") **or does not explicitly ask to 
    generate code**, then:
-   Respond with a simple, friendly text message instead of generating any code.

Example:
-   User: "Hi" -> Reponse: "Hello! How can I help you today?"
-   User: "Build a responsive loading page with Tailwind CSS" -> Response: [Generate full HTML code as per instruction above]
`

const Playgroundmainsection = () => {
    const { projectid } = useParams()
    const params = useSearchParams()
    const frameId = params.get('frameid')

    // const { setFrameData } = useGetFrameDetails()

    const [frameDetails, setFrameDetails] = useState<Frame>()
    const [messages, setMessages] = useState<chatMessagesitem[]>([])
    const [generatedCode, setGeneratedCode] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    // Get Frame Details
    const getFrameDetails = async () => {
        const details = await axios.get(`${routesApiurl.frameGetDetailsURL}?frameId=${frameId}&projectId=${projectid}`)
        console.log('Frame Details', details.data)
        setFrameDetails(details?.data)

        const designCode = details?.data?.designCode
        const index = designCode?.indexOf('```html') + 7;
        const formatedCode = designCode?.slice(index)

        setGeneratedCode(formatedCode ?? '')

        if (details?.data?.chatMessages?.length === 1) {
            const userMessage = details?.data?.chatMessages[0].content
            sendMessage(userMessage)
        } else {
            setMessages(details?.data?.chatMessages)
        }
    }

    useEffect(() => {
        frameId && getFrameDetails()
    }, [frameId])

    console.log('frameDetails', frameDetails)

    const sendMessage = async (userInput: string) => {
        setLoading(true)
        const assistent = { role: 'user', content: userInput }
        setMessages((prev: chatMessagesitem[]) => [...prev, assistent])
        const aiPostresults = await fetch(routesApiurl.aiModelURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{ ...assistent, content: prompt.replaceAll(`{userInput}`, userInput) }]
            })
        });

        console.log('aiPostresults', aiPostresults)
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
                setGeneratedCode((prev: any) => prev + initialCodeChunk)
            }
            else if (isCode) {
                setGeneratedCode((prev: any) => prev + text)
            }
        }
        await SaveGenerated_code(response)
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
    }


    // console.log('messages', messages)
    // console.log('generatedcode', generatedCode)

    useEffect(() => {
        // console.log(generatedCode)

        // Update messages
        if (messages?.length > 0) {
            SaveMessages()
        }
    }, [messages])

    //Save Messages
    const SaveMessages = async () => {
        const results = await axios.put(routesApiurl.aiChatUpdateURL, {
            messages: messages,
            frameId: frameId
        })
    }

    // Save Generated Code
    const SaveGenerated_code = async (code: string) => {
        try {
            const results = await axios.put(routesApiurl.frameGetDetailsURL, {
                frameId: frameId,
                projectId: projectid,
                designCode: code
            })
            console.log(results?.data)
            toast.success('Website is ready ')
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='w-full flex h-[calc(100vh-60px)]'>
            {/* Chat Section */}
            <PlaygroundChatsection
                msg={messages ?? []}
                onSend={(input: string) => sendMessage(input)}
                loading={loading}
            />

            {/* Website Design Section */}
            <PlaygroundWebsiteDesignsection
                generatedCode={generatedCode?.replace('```', '')}
            />

            {/* Setting Section */}
            <PlaygroundSettingsection />
        </div>
    )
}

export default Playgroundmainsection