'use client'
import { useContext } from 'react'
// import React, { useContext } from 'react'
import { UserDetailsContext } from '../../Context/UserDetailsContext'
import { Progress } from '@/components/ui/progress'
import CommonButton from '../_Field/CommonButton'
import { UserButton } from '@clerk/nextjs'

const SidebarFootersection = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext)
    console.log('footer userDetails', userDetails)
    return (
        <div className="p-3 border rounded-xl space-y-3 bg-secondary">
            <h2 className='flex justify-between items-center'>
                Remaining Credits1 <span className="font-bold">{userDetails?.credits}</span>
            </h2>
            <Progress value={33} />
            <CommonButton
                buttonText='Upgrade to Unlimited'
                varient='default'
            />
            <div className='flex justify-between items-center gap-2 mt-5'>
                <UserButton />
                <CommonButton
                    buttonText='Settings'
                    varient='ghost'
                />
            </div>
        </div>
    )
}

export default SidebarFootersection