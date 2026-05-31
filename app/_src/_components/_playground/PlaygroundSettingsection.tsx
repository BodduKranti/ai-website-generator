'use client'
import { SwatchBook } from 'lucide-react'
import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetFrameDetails } from '../../Context/GetFrameDetails'

const PlaygroundSettingsection = () => {
    const { selectedEl } = useGetFrameDetails()

    console.log('selectedEl', selectedEl)

    return (
        <div className='p-4 w-96 shadow  '>
            <h2 className='flex gap-2 items-center font-bold'><SwatchBook className='w-5 h-5' /> Settings</h2>
            <label className='text-sm'>Font Size</label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(53)].map((item, index) => (
                        <SelectItem value={index + 12 + `px`} key={index}>{index + 12}px</SelectItem>
                    ))}
                    {/* <SelectGroup>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectGroup> */}
                </SelectContent>
            </Select>
        </div>
    )
}

export default PlaygroundSettingsection