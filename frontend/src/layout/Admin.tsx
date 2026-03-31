import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/features/sidebar/AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useApiMutation } from "@/hooks/useMutation";
import { useUserStore } from "@/store/user";
import { LayoutDashboard, BookOpen, FolderTree, Wallet, Users, Tags, MessageSquare, Bell, Search } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ModeToggle } from "@/features/DarkMode";
import { useState } from "react";

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
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => setIsMobileOpen(false);

  const isRouteActive = (to: string, end?: boolean) => {
    if (end) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="admin-gradient min-h-screen text-foreground font-admin">
      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
          aria-label="Close sidebar"
        />
      )}

      <div className="flex min-h-screen">
        <AdminSidebar
          menuItems={menuItems}
          userName={user?.name}
          userEmail={user?.email}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          isRouteActive={isRouteActive}
          onToggle={handleSidebarToggle}
          onCloseMobile={closeMobileSidebar}
          onLogout={handleLogout}
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 md:p-6 lg:pl-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
                  <div className="relative w-full max-w-xs">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search admin data..."
                      className="h-9 rounded-xl bg-background/70 pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                    <Bell size={16} />
                  </Button>
                  <ModeToggle />
                </div>
              </div>

            <section className="glass-card min-h-[60vh] p-4 md:p-6 animate-fade-up">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutForAdmin;
