'use client'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CommonButton from '../_Field/CommonButton'
import { Code2Icon, Copy, DownloadIcon, Monitor, SquareArrowOutUpRight, TabletSmartphone } from 'lucide-react'
import { HTMLCode } from './HTMLCode'
import DailogBoxCommon from '../_Field/DailogBoxCommon'
import { toast } from 'sonner';

interface Webpageprops {
    screensizesWeb: string,
    setScreensizesWeb: Dispatch<SetStateAction<any>>,
    generatedCode: any
}

const WebpageToo: FC<Webpageprops> = ({ setScreensizesWeb, screensizesWeb, generatedCode }) => {

    const [finalCode, setFinalCode] = useState<any>()

    useEffect(() => {
        const cleanCode = (HTMLCode.replace("{code}", generatedCode) || '')
            .replaceAll("```html", "")
            .replaceAll("```", "")
            .replace("html", "")
        setFinalCode(cleanCode)
    }, [generatedCode])


    // View HTML generated Code in new tab
    const ViewCodeopenNewTab = () => {
        if (!finalCode) return;
        const blob = new Blob([finalCode], { type: 'text/html' })
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank")

    }

    // Copy the HTML Code
    const hanldeCopy = async () => {
        await navigator.clipboard.writeText(finalCode)
        toast.success('Code copied')
    }

    // Download the HTML Code
    const donwloadFile = () => {
        if (!finalCode) return;

        const blob = new Blob([finalCode], { type: 'text/html' })
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url)
    }

    const buttonSections = {
        left: [
            {
                btnName: '',
                btnIcon: <Monitor className='w-5- h-5' />,
                clickName: 'web'
            },
            {
                btnName: '',
                btnIcon: <TabletSmartphone className='w-5- h-5' />,
                clickName: 'phone'
            }
        ],
        right: [
            {
                btnName: 'View',
                btnIcon: <SquareArrowOutUpRight className='w-5- h-5' />,
                funMethodName: ViewCodeopenNewTab,
                linkName: ''
            }
        ]
    }

    return (
        <div className='w-full rounded-xl shadow p-2 flex justify-between gap-2 items-center mt-2'>
            <div className='flex gap-2 items-center'>
                {
                    buttonSections.left.map(({ btnName, btnIcon, clickName }) => (
                        <CommonButton
                            buttonText={btnName}
                            icon={btnIcon}
                            varient='outline'
                            onClick={() => setScreensizesWeb(clickName)}
                            className={`${screensizesWeb === clickName ? 'border-blue-800' : ''} w-auto!`}
                            key={clickName}
                        />
                    ))
                }

            </div>

            <div className='flex justify-end gap-2 items-center'>
                {
                    buttonSections.right.map(({ btnName, btnIcon, funMethodName }, index) => (
                        <CommonButton
                            buttonText={btnName}
                            icon={btnIcon}
                            varient='outline'
                            onClick={funMethodName}
                            className={` w-auto!`}
                            key={index}
                        />
                    ))
                }

                <DailogBoxCommon
                    dialogSizes='large'
                    dailogButton={<CommonButton
                        buttonText='View Code'
                        icon={<Code2Icon className='w-5 h-5' />}
                        varient='outline'
                        className={`w-auto!`}
                    />}
                    content={
                        <div className='w-full'>
                            <SyntaxHighlighter>
                                {finalCode}
                            </SyntaxHighlighter>

                        </div>

                    }
                    dialogHeader="Yes"
                    dialogHeaderTitle={
                        <div className='flex items-center gap-2'>
                            Source Code
                            <CommonButton
                                buttonText=''
                                icon={<Copy className='w-5 h-5' />}
                                varient='default'
                                onClick={hanldeCopy}
                                className={'w-auto!'}
                            />

                        </div>
                    }
                    dialogFooter='No'
                    contentScroll='Yes'
                />

                <CommonButton
                    buttonText={'Download'}
                    icon={<DownloadIcon className='w-5 h-5' />}
                    varient='outline'
                    onClick={donwloadFile}
                    className={` w-auto!`}
                />
            </div>

        </div>
    )
}

export default WebpageToo
