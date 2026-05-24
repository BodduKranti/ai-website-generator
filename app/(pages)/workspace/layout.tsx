import React, { ReactNode } from 'react'

const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full'>{children}</div>
    )
}

export default WorkspaceLayout