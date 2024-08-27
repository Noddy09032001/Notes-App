import { ThemeSelector } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Navbar(){
    const menuOptions = [
        { label: "Create Note", link: "/create-note" },
        { label: "All Notes", link: "/notes-display" },
        { label: "Profile", link: "/profile" },
    ];
 
    return (
        <div className="flex items-center justify-between p-4 shadow-lg bg-secondary border-b border-border">
            <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-primary">Notes-App</h2>
                <span className="text-sm text-muted-foreground">All your notes in a go...</span>
            </div>
            <div className="flex items-center space-x-6">
                <ThemeSelector />
                {menuOptions.map((notes, index) => (
                    /*<Button
                        key={index}
                        type="button"
                        onClick={() => navigate(notes.link)}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring">
                        {notes.label}
                    </Button>*/
                    <Link
                        key={index}
                        to={notes.link}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring"
                    >
                    {notes.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}