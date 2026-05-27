'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CommonButton from '../_Field/CommonButton'
import SignOutBtn from '../_Field/SignOutBtn'

interface MenuItems {
    pagename: string,
    path: string
}
const MenuName: MenuItems[] = [
    {
        pagename: 'Pricing',
        path: '/pricing'
    },
    {
        pagename: 'Contact-Us',
        path: '/contact-us'
    }
]

const HeaderSection = () => {
    const { user }: any = useUser()
    // console.log('header user', !user ? 'not login' : 'loggedin')
    return (
        <header className='w-full flex items-center justify-between gap-4 px-4 py-2 border-b'>
            <div className=''>
                <Image
                    src={`/logo.svg`}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-20"
                />
            </div>

            <div className='flex gap-2 items-center'>
                {
                    MenuName.map((items, index) => (
                        <Button variant={'ghost'} key={index}>{items.pagename}</Button>
                    ))
                }
            </div>

            <div className='w-auto flex gap-2 items-center justify-center'>
                {
                    !user ?
                        <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                            {/* <CommonButton
                                buttonText='Get Started'
                                varient='default'
                                icon={<ArrowRight className='w-4 h-4' />}
                            /> */}
                            <Button variant={'default'}>Get Started <ArrowRight className='w-4 h-4' /></Button>
                        </SignInButton> :
                        <Link href={'/workspace'}>
                            {/* {user ?? ''} */}
                            <CommonButton
                                buttonText='Get Started'
                                varient='default'
                                icon={<ArrowRight className='w-4 h-4' />}
                            />
                            {/* <Button variant={'default'}>Get Started <ArrowRight className='w-4 h-4' /></Button> */}
                        </Link>

                }
                {
                    user &&
                    <SignOutBtn />
                }
            </div>



        </header>
    )
}

export default HeaderSection
