import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";
import { LogOut, PanelLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

type MenuItem = {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  end?: boolean;
};

type AdminSidebarProps = {
  menuItems: MenuItem[];
  userName?: string | null;
  userEmail?: string | null;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isRouteActive: (to: string, end?: boolean) => boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
  onLogout: () => void;
};

const AdminSidebar = ({
  menuItems,
  isCollapsed,
  isMobileOpen,
  isRouteActive,
  onToggle,
  onCloseMobile,
  onLogout,
}: AdminSidebarProps) => {
  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-40 flex h-svh min-h-svh flex-col bg-card/80 backdrop-blur transition-all duration-200",
        "border-r border-border/60",
        "lg:sticky lg:top-0 lg:z-10 lg:h-svh lg:min-h-svh",
        isCollapsed ? "w-20" : "w-72",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

            {!isCollapsed && (
              <div>
                <p className="text-md uppercase tracking-widest text-muted-foreground">Admin Console</p>
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onToggle}
            className="h-9 w-9 rounded-xl border bg-background/70"
            aria-label="Toggle sidebar"
          >
            <PanelLeft size={16} />
          </Button>
        </div>
       
      </div>

      <nav className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item.to, item.end);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  isCollapsed ? "justify-center" : "",
                ].join(" ")}
                onClick={onCloseMobile}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-4">
        <Button
          onClick={onLogout}
          variant="outline"
          className={["w-full rounded-xl", isCollapsed ? "justify-center" : "justify-start"].join(" ")}
        >
          <LogOut size={16} className={isCollapsed ? "" : "mr-2"} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
