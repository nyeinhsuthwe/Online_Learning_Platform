import { Library, LogOutIcon, Search, SettingsIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { ModeToggle } from "./DarkMode"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useApiMutation } from "@/hooks/useMutation"
import { toast } from "sonner"
import { useUserStore } from "@/store/user"
import { cn } from "@/lib/utils"
import { useChatNotifications } from "@/store/chatNotifications"

const Navbar = () => {
    const navigate = useNavigate();
    const user = useUserStore();
    const { unreadCount } = useChatNotifications();

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
        <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/30 via-cyan-500/20 to-emerald-500/30">
                        <img src="/logo.png" alt="" className="h-13 w-13 object-contain" />
                    </div>
                    <div className="text-lg font-semibold text-(--nav-text)">
                        Learning Platform
                    </div>
                </div>

                {/* Menu */}
                <ul className="flex items-center gap-4 text-xs font-semibold sm:gap-6 sm:text-sm">
                    <NavLink
                        className={({ isActive }) =>
                            cn(
                                "relative transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )
                        }
                        to={"/user"}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            cn(
                                "relative transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )
                        }
                        to={"/user/course"}
                    >
                        Courses
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            cn(
                                "relative transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )
                        }
                        to={"/user/chat"}
                    >
                        <span className="relative inline-flex items-center gap-2">
                            Chat
                            {unreadCount > 0 && (
                                <span className="absolute -right-4 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}
                        </span>
                    </NavLink>
                </ul>

                <div className="flex gap-3 items-center justify-center">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-11 w-11 rounded-full border border-border/60 bg-background/80 p-0.5 shadow-sm transition hover:shadow-md">
                            <img src={user.user?.avatar || "/ava1.jpg"} alt="User Avatar" className="h-10 w-10 rounded-full object-cover" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 mt-3" align="center">
                        <DropdownMenuItem className="h-10 text-md" onClick={() => navigate("/user/library")}  >
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

                    <button className="hidden h-9 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground transition hover:bg-accent md:flex">
                        <Search size={18} />
                    </button>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
