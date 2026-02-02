import { Library, LogOutIcon, Search, SettingsIcon, UserIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { ModeToggle } from "./DarkMode"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useApiMutation } from "@/hooks/useMutation"
import { toast } from "sonner"
import { useUserStore } from "@/store/user"

const Navbar = () => {
    const navigate = useNavigate();
    const user = useUserStore();

    const logoutMutation = useApiMutation({
        onSuccess: () => {
            useUserStore.getState().logout();
            toast.success("Logged out successfully")
            navigate("/login", { replace: true })
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/logout`,
            method: "POST",
            body: {},
        });
    }


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

            <div className="flex gap-3  items-center justify-cente">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <div className=" border border-gray-500 h-12 w-12 flex items-center justify-center rounded-full text-white">
                            <img src={user.user?.avatar || "/ava1.jpg"} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 mt-3" align="center">
                        <DropdownMenuItem className="h-10 text-md ">
                            <UserIcon className="size-5" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-10 text-md"  >
                            <Library className="size-5" />
                            My Library
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-10 text-md" onClick={() => navigate('/user/setting')}>
                            <SettingsIcon className="size-5" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" className="h-10 text-md" onClick={handleLogout}>
                            <LogOutIcon className="size-5" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button className="bg-blue-500 h-9 w-10 flex items-center justify-center rounded text-white hover:bg-blue-600 transition">
                    <Search size={18} />
                </button>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar
