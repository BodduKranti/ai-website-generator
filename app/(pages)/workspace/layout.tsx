import AppHeader from '@/app/_src/_components/_Appsidebar/AppHeader'
import { AppSidebar } from '@/app/_src/_components/_Appsidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'

const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default WorkspaceLayout