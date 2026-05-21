import { Button } from '@/components/ui/button'
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
        <header className='w-full flex items-center justify-between gap-4'>
            <div className=''>
                <Image
                    src={`/logo.svg`}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-20"
                />
            </div>

            <div className=''>
                {
                    MenuName.map((items, index) => (
                        <Button variant={'ghost'} key={index}>{items.pagename}</Button>
                    ))
                }
            </div>

            <div className=''>
                <Button variant={'default'}>Get Started</Button>
            </div>
        </header>
    )
}

export default HeaderSection
