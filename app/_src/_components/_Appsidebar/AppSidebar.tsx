'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { PlusIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CommonButton from "../_Field/CommonButton"
import SidebarContentSection from "./SidebarContentSection"
import SidebarFootersection from "./SidebarFooter"

export function AppSidebar() {


    return (
        <Sidebar>
            {/* Header section of sidebar */}
            <SidebarHeader>
                <div className="w-full">
                    <Image
                        src={`/logo.svg`}
                        alt="Logo"
                        width={150}
                        height={100}
                        className="w-20"
                    />
                </div>
                <Link href={'/workspace'} className="mt-3">
                    <CommonButton
                        buttonText="Add New Project"
                        icon={<PlusIcon className="w-5 h-5" />}
                        varient='default'
                    />
                </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContentSection />

            {/* Footer section of sidebar */}
            <SidebarFooter>
                <SidebarFootersection />
            </SidebarFooter>
        </Sidebar>
    )
}