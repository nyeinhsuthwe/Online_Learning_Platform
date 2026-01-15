import { CircleUserRound, Search } from "lucide-react"
import { NavLink } from "react-router-dom"
import { ModeToggle } from "./DarkMode"

const Navbar = () => {
    return (
        <nav className="h-16 bg-background z-100 px-16 flex items-center justify-between shadow-sm sticky top-0">
            {/* Logo */}
            <div className="flex items-center justify-center">
                <img src="/logo.png" alt="" className="w-20 h-19" />
                <div className="text-lg font-semibold text-(--nav-text)">
                    Learning Platform
                </div>
            </div>

            {/* Menu */}
            <ul className="flex gap-6 text-foreground text-sm font-semibold">
                <NavLink className="cursor-pointer hover:text-primary-hover transition" to={"/user"}> Home</NavLink>
                <NavLink className="cursor-pointer hover:text-primary-hover transition" to={"/user/course"}> Course</NavLink>
            </ul>

            <div className="flex gap-3">
                <div className="bg-gray-400 h-9 w-9 flex items-center justify-center rounded-full text-white">
                    <CircleUserRound size={18} />
                </div>
                <button className="bg-blue-500 h-9 w-10 flex items-center justify-center rounded text-white hover:bg-blue-600 transition">
                    <Search size={18} />
                </button>
                <ModeToggle/>
            </div>
        </nav>
    )
}

export default Navbar
