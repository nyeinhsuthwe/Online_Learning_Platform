import { Card } from "@/components/ui/card";
import { SettingSidebar } from "@/features/Setting/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ChangePassword } from "@/features/Setting/ChangePassword";
import { EditAcc } from "@/features/Setting/EditAcc";
import { Invoice } from "@/features/Setting/Invoice";


export function Setting() {
   const [panelOpen, setPanelOpen] = useState(() => {
    return localStorage.getItem("settings-panel") || "edit-acc";
  });
  useEffect(() => {
    localStorage.setItem("settings-panel", panelOpen);
  }, [panelOpen]);

  return (
    <div className="w-full">
      <span className="flex justify-center mb-12 text-2xl font-bold">
        Account Settings
      </span>

      <SidebarProvider>
        <Card className="flex flex-row w-full max-w-5xl mx-auto px-0 md:px-5 ">

          {/* Sidebar */}
          <div className="">
            <SettingSidebar setPanelOpen={setPanelOpen} />
          </div>

          {/* Content */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-2xl  py-10">
              {panelOpen === "edit-acc" && <EditAcc />}
              {panelOpen === "change-password" && <ChangePassword />}
              {panelOpen === "invoice" && <Invoice />}
            </div>
          </div>
        </Card>
      </SidebarProvider>
    </div>
  );
}
