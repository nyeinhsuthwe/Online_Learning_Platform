import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentMethod } from "./PaymentMethod"

export function Contact() {
    return (
        <Card className="  p-6 rounded-md bg-transparent">
            <h2 className="text-[20px] font-bold ">
                Contact Information
            </h2>

            <form className="space-y-4">
                {/* Name */}
                <div className="space-y-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="h-12" />
                </div>

                {/* Email */}
                <div className="space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="h-12" />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="09xxxxxxxx" className="h-12" />
                </div>

            </form>

            <PaymentMethod/>
        </Card>
    )
}
