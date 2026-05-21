import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import HeaderSection from "./_src/_components/_Header/Header";
import Hero from "./_src/_components/_Hero/Hero";
export default function Home() {
    return (
        <div className="w-full">
            <HeaderSection />

            <Hero />
        </div>
    );
}
