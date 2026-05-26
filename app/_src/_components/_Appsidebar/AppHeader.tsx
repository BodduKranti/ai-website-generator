import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader = () => {
    return (
        <div className='w-full flex justify-between items-center shadow p-4'>
            <SidebarTrigger />
            <UserButton />
        </div>
    )
}

export default AppHeader