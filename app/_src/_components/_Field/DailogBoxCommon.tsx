import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FC } from "react"

interface DailogBoxCommonprops {
    dailogButton: any,
    dialogHeader: "Yes" | "No",
    dialogHeaderTitle?: any,
    dialogHeaderDescription?: any,
    content: any,
    dialogFooter: "Yes" | "No",
    dialogFooterTitle?: any,
    dialogFooterDescription?: any,
    contentScroll: "Yes" | "No",
    dialogSizes: "extra-large" | 'large' | 'medium' | 'small' | 'extra-small' | 'default'
}

const DailogBoxCommon: FC<DailogBoxCommonprops> = ({
    dailogButton,
    dialogHeader,
    dialogHeaderTitle,
    dialogHeaderDescription,
    content,
    dialogFooter,
    contentScroll,
    dialogSizes
}) => {
    return (
        <Dialog>
            <DialogTrigger>{dailogButton}</DialogTrigger>
            <DialogContent className={`
                ${dialogSizes === "extra-large" && 'min-w-7xl'}
                ${dialogSizes === "large" && 'min-w-5xl'}
                ${dialogSizes === "medium" && 'min-w-3xl'}
                ${dialogSizes === "small" && 'min-w-lg'}
                ${dialogSizes === "extra-small" && 'min-w-sm'}
                ${dialogSizes === "default" && "w-full max-w-none"}
                `}>
                {
                    dialogHeader === "Yes" &&
                    <DialogHeader>
                        <DialogTitle>{dialogHeaderTitle}</DialogTitle>
                        <DialogDescription>
                            {dialogHeaderDescription}
                        </DialogDescription>
                    </DialogHeader>
                }

                {contentScroll === "Yes" ?
                    <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                        {content}
                    </div> :
                    <div className="w-full">
                        {content}
                    </div>
                }

                {
                    dialogFooter === 'Yes' &&
                    <DialogFooter>
                        <DialogClose>Close</DialogClose>
                    </DialogFooter>
                }

            </DialogContent>
        </Dialog>
    )
}

export default DailogBoxCommon
