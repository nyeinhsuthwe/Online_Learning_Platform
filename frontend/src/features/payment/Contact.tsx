import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentMethod } from "./PaymentMethod"
import { useUserStore } from "@/store/user"
import { ContactSkeleton } from "../skeletons/ContactSkeleton"


export function Contact() {
    const { user } = useUserStore()
    if (!user) {
        return <div><ContactSkeleton/></div>
    }
    return (
        <Card className="glass-card p-6">
            <h2 className="text-[20px] font-bold text-foreground">
                Contact Information
            </h2>

            <form className="space-y-4">
                {/* Name */}
                <div className="space-y-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder={user?.name} disabled className="h-12 rounded-xl bg-background/70" />
                </div>

                {/* Email */}
                <div className="space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder={user?.email} disabled className="h-12 rounded-xl bg-background/70 placeholder:text-muted-foreground" />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder={user?.phone || "There is no phone"} disabled className="h-12 rounded-xl bg-background/70" />
                </div>

            </form>

            <PaymentMethod />
        </Card>
    )
}
