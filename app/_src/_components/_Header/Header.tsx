import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

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

            <div className=''>
                <Button variant={'default'}>Get Started <ArrowRight className='w-4 h-4' /></Button>
            </div>
        </header>
    )
}

export default HeaderSection
