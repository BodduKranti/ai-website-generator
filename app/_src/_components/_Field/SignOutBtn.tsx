import { useClerk } from '@clerk/nextjs'
import React from 'react'
import CommonButton from './CommonButton'

const SignOutBtn = () => {
    const { signOut } = useClerk()
    const handleSubmit = async ()=>{
        await signOut({
            redirectUrl: '/'
        })
    }
    return (
        <div className='w-30' onClick={handleSubmit}>
            <CommonButton 
                buttonText='Signout'
                varient='destructive'

            />
        </div>
    )
}

export default SignOutBtn