'use client'
import { AlignCenter, AlignLeft, AlignRight, SwatchBook } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetFrameDetails } from '../../Context/GetFrameDetails'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from '@/components/ui/input'
import CommonButton from '../_Field/CommonButton'

const PlaygroundSettingsection = () => {
    const { selectedEl, setSelectedEl, newClass, setNewClass } = useGetFrameDetails()
    const [classes, setClasses] = useState<any[]>([])
    const [align, setAlign] = useState<string>(selectedEl?.style?.textAlign)
    const clearSelectedElefun = () => {
        setSelectedEl(null)
    }

    const applyStyle = (property: string, values: string) => {
        if (selectedEl) {
            selectedEl.style[property as any] = values;
        }
    }

    useEffect(() => {
        if (selectedEl && align) {
            selectedEl.style.textAlign = align
        }
    }, [align, selectedEl])


    // Add New Class
    const AddClass = () => {
        const trimmed = newClass.trim()
        if (!trimmed) return;
        //@ts-ignore
        if (!classes?.includes?.apply(trimmed)) {
            const updated = [...classes, trimmed]
            setClasses(updated);
            selectedEl.className = updated?.join(" ")
        }
        setNewClass('')
    }

    // Remove Class
    const RemoveClass = (cls: string) => {
        const updated = classes?.filter((list) => list !== cls)
        setClasses(updated)
        selectedEl.className = updated?.join(" ")
    }

    // Keep in sync if element classess are modified elsewhere
    useEffect(() => {
        if (!selectedEl) return;

        // set initial classes
        const currentClasses = selectedEl?.className.split(" ")
            .filter((c: any) => c.trim() !== "");
        setClasses(currentClasses)

        // watch for future class changes
        const observer = new MutationObserver(() => {
            const updated = selectedEl?.className?.split(" ")?.filter((c: any) => c.trimg() !== "")
            setClasses(updated)
        })

        observer.observe(selectedEl, {
            attributes: true,
            attributeFilter: ["class"]
        })

        return () => observer.disconnect();

    }, [selectedEl])



    return (
        <div className='p-4 w-96 shadow space-y-3 overflow-y-auto h-full'>
            <h2 className='flex gap-2 items-center font-bold'>
                <SwatchBook className='w-5 h-5' /> Settings
            </h2>

            <div className='w-full flex gap-2 justify-between'>
                <div className='w-full'>
                    <label className='text-sm'>Font Size</label>
                    <Select
                        defaultValue={selectedEl?.style?.fontSize || '24px'}
                        onValueChange={(value: any) => applyStyle(`fontSize`, value)}
                    >
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

                <div className='w-20'>
                    <label className='text-sm'>Color</label>
                    <div className='w-full'>
                        <input
                            value={selectedEl?.style?.color || '#000000'}
                            type='color'
                            className='w-8 h-8 rounded-md'
                            onChange={(e: any) => applyStyle(`color`, e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <label className='text-sm'>Text Allignment</label>
                <div className='w-full'>
                    <ToggleGroup
                        type="single"
                        className='bg-gray-100 rounded-lg p-1 
                        inline-flex w-full justify-between'
                        value={align}
                        onValueChange={setAlign}
                    >
                        <ToggleGroupItem
                            className='p-2 rounded hover:bg-gray-200 flex-1'
                            value="left">
                            <AlignLeft className='w-5 h-5' />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className='p-2 rounded hover:bg-gray-200 flex-1'
                            value="center" >
                            <AlignCenter className='w-5 h-5' />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className='p-2 rounded hover:bg-gray-200 flex-1'
                            value="right">
                            <AlignRight className='w-5 h-5' />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>



            <div className="w-full flex items-center gap-4">
                <div className='w-20'>
                    <label className='text-sm'>Background</label>
                    <div className='w-full'>
                        <input
                            value={selectedEl?.style?.backgroundColor || '#ffffff '}
                            type='color'
                            className='w-8 h-8 rounded-md'
                            onChange={(e: any) => applyStyle(`backgroundColor`, e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex-1'>
                    <label className='text-sm'>Border Radius</label>
                    <input
                        className='w-full shadow border rounded-md px-2 py-1'
                        type="text"
                        placeholder='e.g. 8px'
                        defaultValue={selectedEl?.style?.borderRadius || ''}
                        onChange={(e: any) => applyStyle('borderRadius', e.target.value)}
                    />
                </div>
            </div>

            <div className='w-full'>
                <div className='flex-1'>
                    <label className='text-sm'>Padding</label>
                    <input
                        className='w-full shadow border rounded-md px-2 py-1'
                        type="text"
                        placeholder='e.g. 10px 15px'
                        defaultValue={selectedEl?.style?.padding || ''}
                        onChange={(e: any) => applyStyle('padding', e.target.value)}
                    />
                </div>
            </div>

            <div className='w-full'>
                <div className='flex-1'>
                    <label className='text-sm'>Margin</label>
                    <input
                        className='w-full shadow border rounded-md px-2 py-1'
                        type="text"
                        placeholder='e.g. 10px 15px'
                        defaultValue={selectedEl?.style?.margin || ''}
                        onChange={(e: any) => applyStyle('margin', e.target.value)}
                    />
                </div>
            </div>


            {/* Class Manager */}
            <div className='w-full'>
                <label className='text-sm'>Classes</label>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {
                        classes?.length > 0 ?
                            classes.map((list, index) => (
                                <span
                                    className='flex text-xs items-center gap-2 bg-gray-100 border rounded-md p-1'
                                    key={index}>
                                    {list}
                                    <CommonButton
                                        buttonText=''
                                        icon={'x'}
                                        onClick={() => RemoveClass(list)}
                                        varient='ghost'
                                        className={`w-auto! text-red-500 hover:text-red-700 cursor-pointer p-0! text-xs!`}
                                    />
                                </span>
                            )) :
                            <span className='text-xs text-gray-500'>No Classes applied</span>
                    }
                </div>

                <div className='flex gap-2 mt-2'>
                    <Input
                        value={newClass}
                        onChange={(e: any) => setNewClass(e.target.value)}
                    />
                    <CommonButton
                        buttonText='Add'
                        varient='default'
                        onClick={AddClass}
                        className={`w-20! py-1! px-2! text-sm!`}
                    />
                </div>
            </div>

        </div>
    )
}

export default PlaygroundSettingsection