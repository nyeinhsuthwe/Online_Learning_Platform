import { Lock, ReceiptText, UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SettingSidebar({ setPanelOpen }: { setPanelOpen: (panel: string) => void }) {
    const items = [
        { title: "Edit Account", path: "/user/setting/edit-account", icon: UserRoundPen, panel: "edit-acc" },
        { title: "Change Password", path: "/user/setting/change-password", icon: Lock, panel: "change-password" },
        { title: "Invoice", path: "/user/setting/invoice", icon: ReceiptText, panel: "invoice" },
    ];

    return (
        <nav className="flex flex-wrap items-center gap-2">
            {items.map((item) => (
                <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setPanelOpen(item.panel)}
                    className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary"
                >
                    <item.icon className="size-4" />
                    {item.title}
                </NavLink>
            ))}
        </nav>
    );
}
