'use client'
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { routesApiurl } from '../../types'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const SidebarContentSection = () => {
    const [projectList, setProjectList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const GetAllprojects = async () => {
        setLoading(true)
        try {
            const result = await axios.get(routesApiurl.getallProjectsURL)
            console.log('get all projects', result?.data)
            setProjectList(result?.data)
            setLoading(false)
        } catch (error) {
            console.log('get all projects error', error)
            setLoading(false)
        }
    }


    useEffect(() => {
        GetAllprojects();
    }, [])
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                {
                    loading ? (
                        // <div className='flex justify-center gap-2 items-center'>
                        //     <Loader2Icon className='w-5 h-5 animated-spin' />
                        //     <h2 className='text-sm text-gray-500 px-2'>Loading...</h2>
                        // </div>
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <div className='w-full' key={index}>
                                <Skeleton className='w-full rounded-2xl h-10 mt-2' />
                            </div>
                        ))
                    ) : projectList.length === 0 ? (
                        <h2 className='text-sm text-gray-500 px-2'>No Project found</h2>
                    ) : (
                        !loading && projectList.length > 0 &&
                        projectList.map((project: any) => (
                            project?.chats?.map((chat: any) => (
                                chat?.chatMessages?.map((message: any, index: any) => (
                                    <Link href={`/playground/${project.projectId}?frameid=${chat.frameId}`}
                                        key={project.projectId + index + 1}
                                        className='text-sm text-gray-500 px-2 hover:bg-secondary rounded-md cursor-pointer  '>
                                        <h2 className='line-clamp-1 p-1'>
                                            {message?.content || 'New Project'}
                                        </h2>
                                    </Link>
                                ))
                            )
                            ))
                        )
                        // :
                        // [1, 2, 3, 4, 5].map((_, index) => (
                        //     <Skeleton className='w-full rounded-2xl h-10 mt-2' />
                        // ))
                    )
                }
            </SidebarGroup>

            <SidebarGroup />
        </SidebarContent>

    )
}

export default SidebarContentSection