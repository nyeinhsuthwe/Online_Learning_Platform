import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Lock, ReceiptText, UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SettingSidebar({ setPanelOpen }: { setPanelOpen: (panel: string) => void }) {
    const items = [
        { title: "Edit Account", path: "/user/setting/edit-account", icon: UserRoundPen, panel:"edit-acc" },
        { title: "Change Password", path: "/user/setting/change-password", icon: Lock, panel:"change-password" },
        { title: "Invoice", path: "/user/setting/invoice", icon: ReceiptText, panel:"invoice" },
    ];

    return (
        <Sidebar className=" relative w-full py-10 bg-card ">
            <SidebarContent className="h-full ">
                <SidebarGroup className="p-0 px-10 py-2  bg-card h-full">
                    <SidebarGroupContent className="bg-card">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className=" ">
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.path} onClick={() => setPanelOpen(item.panel)} className="flex items-center gap-2 h-15 px-3 hover:bg-blue-200 rounded-md">
                                            <div className="size-5 flex items-center justify-center font-semibold">
                                                <item.icon />
                                            </div>
                                            <span className="text-[16px] font-semibold ">{item.title}</span>
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
