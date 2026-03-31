import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AVATARS } from "@/constant/avatar";
import { useApiMutation } from "@/hooks/useMutation";
import { useUserStore} from "@/store/user";
import { useState } from "react";
import { toast } from "sonner";
import { EditAccSkeleton } from "../skeletons/EditAccSkeleton";

export function EditAcc() {
    const { user, updateUser, isLoading } = useUserStore()
    const [open, setOpen] = useState(false);

    const handleSelectAvatar = (avatar: string) => {
        updateUser({ avatar });
        setOpen(false);
    };
    const updateMutation = useApiMutation({
        onSuccess: (res : any) => {
            updateUser(res);
            toast.success("Profile updated successfully");
        },
        onError: (err) => {
            toast.error(err.message || "Update failed");
        },
    });

    const handleSave = () => {
        updateMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/update/${user?._id}`,
            method: "PUT",
            body: {
                name: user?.name,
                phone: user?.phone,
                email: user?.email,
                bio: user?.bio,
                avatar: user?.avatar,
            },
        });
    };

    if(isLoading){
        return <div><EditAccSkeleton /></div>
    }
   

    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex flex-col  gap-2 items-center">
                <img src={user?.avatar || "/ava1.jpg"} alt="User Avatar" className="w-24 h-24 rounded-full object-cover mb-2 border border-border/60" />
                <Button onClick={() => setOpen(true)} className="w-36 h-10 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 text-white shadow-sm hover:shadow-md">Change Avatar</Button>

                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="glass-card w-96 p-6">
                            <h3 className="text-lg font-semibold mb-4 text-center">
                                Choose Avatar
                            </h3>

                            <div className="grid grid-cols-4 gap-3 ">
                                {AVATARS?.map((avatar) => (
                                    <button
                                        key={avatar}
                                        onClick={() => handleSelectAvatar(avatar)}
                                        className={`rounded-full  border-2 p-1 w-18 transition
                                                ${user?.avatar === avatar
                                                ? "border-blue-500"
                                                : "border-transparent hover:border-gray-300"
                                            }`}
                                    >
                                        <img
                                            src={avatar}
                                            className="w-14 h-14 rounded-full mx-auto object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                className="w-full mt-4 h-10 rounded-xl border border-border/70 bg-background/70 text-foreground hover:bg-accent"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">Name</Label>
                <Input className="h-12 rounded-xl bg-background/70" value={user?.name} onChange={(e) => updateUser({ name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">Email</Label>
                <Input className="h-12 rounded-xl bg-background/70" value={user?.email} onChange={(e) => updateUser({ email: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">Phone</Label>
                <Input className="h-12 rounded-xl bg-background/70" value={user?.phone} onChange={(e) => updateUser({ phone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">Bio</Label>
                <Textarea className="h-24 rounded-xl bg-background/70" value={user?.bio || ""} onChange={(e) => updateUser({ bio: e.target.value })} />
            </div>
            <div className="flex flex-col items-end gap-2 ">
                <Button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="w-60 h-12 rounded-xl bg-emerald-500 text-[15px] text-white shadow-sm hover:bg-emerald-600 hover:shadow-md">Save Changes</Button>
            </div>
        </div>
    )
}
