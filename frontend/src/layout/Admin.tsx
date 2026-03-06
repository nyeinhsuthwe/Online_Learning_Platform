import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useMutation";
import { useUserStore } from "@/store/user";
import { LayoutDashboard, BookOpen, FolderTree, Wallet, Users, LogOut, Tags, MessageSquare } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ModeToggle } from "@/features/DarkMode";

const menuItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/categories", icon: Tags, label: "Categories" },
  { to: "/admin/courses", icon: BookOpen, label: "Courses" },
  { to: "/admin/content", icon: FolderTree, label: "Chapters & Episodes" },
  { to: "/admin/enrollments", icon: Wallet, label: "Enrollments" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/support-chat", icon: MessageSquare, label: "Support Chat" },
];

const LayoutForAdmin = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const logoutMutation = useApiMutation({
    onSuccess: () => {
      Cookies.remove("Token");
      localStorage.removeItem("userRole");
      logout();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    },
    onError: () => {
      Cookies.remove("Token");
      localStorage.removeItem("userRole");
      logout();
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/logout`,
      method: "POST",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4 p-4 md:p-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-72 rounded-xl border bg-card p-4 shadow-sm md:block">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="">
              <p className="text-sm text-muted-foreground">Admin Panel</p>
              <p className="font-semibold">{user?.name || "Admin"}</p>
            </div>
            <ModeToggle />
          </div>
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  end={item.end}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 flex items-center gap-2">
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="w-full rounded-xl border bg-card p-4 shadow-sm md:p-6">
          <div className="mb-4 border-b pb-4 md:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin</p>
                <p className="font-semibold">{user?.name || "Admin"}</p>
              </div>
              <ModeToggle />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`
                    }
                  >
                    <Icon size={14} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
            <Button onClick={handleLogout} variant="outline" className="mt-3 h-8 px-3 text-xs">
              Logout
            </Button>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutForAdmin;
