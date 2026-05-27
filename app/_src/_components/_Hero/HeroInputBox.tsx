'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { ArrowUp, ImagePlusIcon, Loader2Icon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { routesApiurl } from '../../types'
import { v4 as uuidv4 } from "uuid";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface HeroInputBoxprops {
    userInput: any,
    setUserInput: Dispatch<SetStateAction<any>>
}

const generateRandomFrameNumber = () => {
    const number = Math.floor(Math.random() * 10000)
    return number
}

const HeroInputBox = ({ userInput, setUserInput }: HeroInputBoxprops) => {
    const { user } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const createNewproject = async () => {
        setLoading(true)
        const projectId = uuidv4();
        const frameId = generateRandomFrameNumber();
        const messages = [{
            role: 'user',
            content: userInput
        }]

        const payload = {
            projectId, frameId, messages
        }
        console.log(' payload', payload)
        try {
            const result = await axios.post(`/api/projects`, payload)
            console.log('post project restults', result);
            toast.success('Project Created Successfully')
            setLoading(false)
            // router.push(`/playground/${projectId}?frameid=${frameId}`)
        } catch (error) {
            toast.error('Internal server Error')
            setLoading(false)
        }
    }

    return (
        <form className='w-full max-w-2xl border p-5 rounded-2xl'>
            <textarea
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                placeholder='Describe your page design'
                className='w-full h-24 focus:outline-none focus:ring-0 resize-none'
            />
            <div className='w-full flex justify-between  items-center'>
                <Button variant={'ghost'}><ImagePlusIcon className='w-4 h-4' /></Button>
                {
                    !user ?
                        <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                            <Button disabled={!userInput} type='button' variant={'default'}><ArrowUp className='w-4 h-4' /></Button>
                        </SignInButton> :
                        <Button
                            type='button'
                            onClick={createNewproject}
                            disabled={!userInput || loading}>
                            {
                                loading ?
                                    <Loader2Icon className='w-4 h-4 animate-spin' /> :
                                    <ArrowUp className='w-4 h-4' />
                            }
                        </Button>
                    // <button type='button' onClick={createNewproject}>
                    //     {
                    //         loading ?
                    //             <Loader2Icon className='w-4 h-4 animate-spin' /> :
                    //             <ArrowUp className='w-4 h-4' />
                    //     }
                    // </button>

                }

                {/* <button type='button' onClick={() => {
                    console.log('working')
                    alert('working')
                }}>
                    {
                        loading ?
                            <Loader2Icon className='w-4 h-4 animate-spin' /> :
                            <ArrowUp className='w-4 h-4' />
                    }
                </button> */}

            </div>
        </form>
    )
}

export default HeroInputBox

