'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailsContext } from '../Context/UserDetailsContext'

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { user } = useUser()// if user exsist then get the details from the user

    // console.log('user', user)
    const [userDetails, setUserDetails] = useState<any>(null)

    useEffect(() => {
        user && CreateUSer()
    }, [user])

    const CreateUSer = async () => {
        const result = await axios.post(`/api/users`, {})
        console.log('user', result.data)
        setUserDetails(result?.data?.user)
    }
    return (
        <div className='w-full'>
            <UserDetailsContext value={{ userDetails, setUserDetails }}>
                {children}
            </UserDetailsContext>
        </div>
    )
}

export default Provider