import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Lock, ReceiptText, UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SettingSidebar({ setPanelOpen }: { setPanelOpen: (panel: string) => void }) {
    const items = [
        { title: "Edit Account", path: "/user/setting/edit-account", icon: UserRoundPen, panel: "edit-acc" },
        { title: "Change Password", path: "/user/setting/change-password", icon: Lock, panel: "change-password" },
        { title: "Invoice", path: "/user/setting/invoice", icon: ReceiptText, panel: "invoice" },
    ];

    return (
        <Sidebar className=" relative  py-10 bg-card ">
            <SidebarContent className="h-full ">
                <SidebarGroup className="px-5  bg-card h-full">
                    <SidebarGroupContent className="bg-card">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className=" ">
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.path}
                                            onClick={() => setPanelOpen(item.panel)}
                                            className="grid grid-cols-[24px_auto] items-center gap-3 h-14 rounded-md  transition-colors hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:text-foreground ">
                                            <div className="flex items-center justify-center">
                                                <item.icon className="size-5" />
                                            </div>

                                            <span className="text-[16px] font-semibold text-left">
                                                {item.title}
                                            </span>
                                        </NavLink>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
