'use client'
import Image from 'next/image'
import CommonButton from '../_Field/CommonButton'

const PlaygroundHeader = () => {
    // const { frameData } = useGetFrameDetails()
    // console.log('frameData generate code', frameData)
    const SaveProject = () => {
        console.log('save')
    }
    return (
        <div className='w-full flex items-center justify-between gap-4 px-4 py-2 border-b'>
            <Image
                width={100}
                height={100}
                src={`/logo.svg`}
                alt='logo'
            />
            <CommonButton
                buttonText='Save'
                varient='default'
                onClick={SaveProject}
                className={`w-30! `}
            />
        </div>
    )
}

export default PlaygroundHeader