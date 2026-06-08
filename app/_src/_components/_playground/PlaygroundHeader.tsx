'use client'
import Image from 'next/image'
import CommonButton from '../_Field/CommonButton'
import { useGetFrameDetails } from '../../Context/GetFrameDetails'
import { Loader2Icon } from 'lucide-react'

const PlaygroundHeader = () => {
    const { onSaveElloading, setOnSaveEl } = useGetFrameDetails()
    return (
        <div className='w-full flex items-center justify-between gap-4 px-4 py-2 border-b'>
            <Image
                width={100}
                height={100}
                src={`/logo.svg`}
                alt='logo'
            />
            <CommonButton
                buttonText={onSaveElloading ? <Loader2Icon className='w-5 h-5 animate-spin' /> : 'Save'}
                varient='default'
                onClick={() => {
                    setOnSaveEl(Date.now())
                }}
                className={`w-30! `}
                disabled={onSaveElloading}
            />
        </div>
    )
}

export default PlaygroundHeader