import { GetFrameDetailsProvider } from '@/app/_src/Context/GetFrameDetails'
import React, { ReactNode } from 'react'

const ProjectPlaygroundLayout = ({ children }: { children: ReactNode }) => {
    return (
        <GetFrameDetailsProvider>
            {children}
        </GetFrameDetailsProvider>
    )
}

export default ProjectPlaygroundLayout
