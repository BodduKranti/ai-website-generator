import { Button } from "@/components/ui/button"
import { Key, LayoutDashboard, User } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface HeroSuggestionsprops {
    setUserInput: Dispatch<SetStateAction<any>>
}

interface Suggestionsitems {
    label: string,
    prompt: string,
    icon: any
}

const SuggestionsList: Suggestionsitems[] = [
    {
        label: 'Dashboard',
        prompt: 'Cleate an analytics dashboard to track customers and revenue data for as SaaS',
        icon: LayoutDashboard
    },
    {
        label: 'Sign Up Form',
        prompt: 'Cleate a modern sign up form with email/password fields. Google and Github login options, and terms checkbox',
        icon: Key
    },
    {
        label: 'Hero',
        prompt: 'Cleate a modern header and centered hero section for a productivity SaaS. Include a badge for feature annoucement, a title woth subtle gradient effect ',
        icon: Key
    },
    {
        label: 'User Profile Card',
        prompt: 'Cleate a modern user profile card for a social media website.',
        icon: User
    }
]

const HeroSuggestions = ({ setUserInput }: HeroSuggestionsprops) => {
    return (
        <div className="w-full flex justify-center items-center gap-3">
            {SuggestionsList.map((suggest, index) => (
                <Button
                    onClick={() => setUserInput(suggest.prompt)}
                    variant={'outline'} key={index} ><suggest.icon className="w-4 h-4" /> {suggest.label}</Button>
            ))}
        </div>
    )
}

export default HeroSuggestions