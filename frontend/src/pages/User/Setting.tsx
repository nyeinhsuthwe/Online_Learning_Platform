import { SettingSidebar } from "@/features/Setting/Sidebar";
import { useEffect, useState } from "react";
import { ChangePassword } from "@/features/Setting/ChangePassword";
import { EditAcc } from "@/features/Setting/EditAcc";
import { Invoice } from "@/features/Setting/Invoice";
import { useUserStore } from "@/store/user";


export function Setting() {
   const [panelOpen, setPanelOpen] = useState(() => {
    return localStorage.getItem("settings-panel") || "edit-acc";
  });
  const { user } = useUserStore();
  useEffect(() => {
    localStorage.setItem("settings-panel", panelOpen);
  }, [panelOpen]);

  return (
    <div className="w-full space-y-8">
      <div className="glass-card px-6 py-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-border/60 bg-background/70">
              <img
                src={user?.avatar || "/ava1.jpg"}
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
              <p className="text-sm text-muted-foreground">{user?.email || "Manage your profile, password, and billing."}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Keep your learning profile up to date.
          </div>
        </div>
      </div>

      <div className="glass-card px-4 py-3">
        <SettingSidebar setPanelOpen={setPanelOpen} />
      </div>

      <div className="glass-card p-6 w-full">
        <div className="">
          {panelOpen === "edit-acc" && <EditAcc />}
          {panelOpen === "change-password" && <ChangePassword />}
          {panelOpen === "invoice" && <Invoice />}
        </div>
      </div>
    </div>
  );
}
