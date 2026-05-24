import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
        <div className='w-full items-center flex justify-center h-screen'>
            <SignIn />
        </div>
    )
}

export default page