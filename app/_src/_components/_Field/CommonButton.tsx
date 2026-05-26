import { Button } from "@/components/ui/button"
import { FC } from "react"

interface CommonButtonprops {
    buttonText: string,
    icon?: any,
    varient: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary',
    className?: any
}

const CommonButton: FC<CommonButtonprops> = ({
    buttonText,
    varient,
    className,
    icon
}) => {
    return (
        <Button variant={varient} className={`flex text-base cursor-pointer items-center justify-content-center gap-2 w-full py-2 px-4 h-auto ${className}`}>
            {icon ?
                <>
                    {icon} {buttonText}
                </> :
                <>
                    {buttonText}
                </>
            }
        </Button>
    )
}

export default CommonButton