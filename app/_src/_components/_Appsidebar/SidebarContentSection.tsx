'use client'
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar'
import React, { useState } from 'react'

const SidebarContentSection = () => {
    const [projectList, setProjectList] = useState<any>([])
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                {
                    projectList.length === 0 && <h2 className='text-sm text-gray-500 px-2'>No Project found</h2>
                }
            </SidebarGroup>

            <SidebarGroup />
        </SidebarContent>

    )
}

export default SidebarContentSection