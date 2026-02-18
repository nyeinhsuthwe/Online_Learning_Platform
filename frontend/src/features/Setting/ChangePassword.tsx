import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiMutation } from "@/hooks/useMutation";
import { useUserStore } from "@/store/user";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

export function ChangePassword() {
    const { user } = useUserStore()
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const updateMutation = useApiMutation({
        onSuccess: () => {
            toast.success("Your password is successfully changed.")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error)
        }
    })

    const handleChanged = () => {

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        updateMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/update-password/${user?._id}`,
            method: "PUT",
            body: { currentPassword, newPassword, confirmPassword }
        })
    }


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label className="text-md">Current Password</Label>
                <div className="relative">
                    <Input type={showPassword ? "text" : "password"} className="h-12" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {!showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">New Password</Label>
                <div className="relative">
                    <Input type={showNewPassword ? "text" : "password"} className="h-12" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {!showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-md">Confirm New Password</Label>
                <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} className="h-12" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter confirm password" />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {!showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="text-[14px] text-blue-500 hover:text-blue-600">
                    <NavLink to="/forgot-password" className="hover:underline">Forgot password?</NavLink>
                </div>
                <Button onClick={() => handleChanged()} disabled={updateMutation.isPending} className="w-60 h-12 text-[15px]  bg-green-500 hover:bg-green-600 text-white flex  my-auto">  {updateMutation.isPending ? "Saving..." : "Save Changes"}</Button>
            </div>
        </div>
    );
}