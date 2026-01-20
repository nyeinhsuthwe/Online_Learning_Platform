import { Contact } from "@/features/payment/Contact"
import { PaymentDetail } from "@/features/payment/PaymentDetail"

export function Enroll() {
    return (
        <div className="grid grid-cols-1 h-180 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8">
            <PaymentDetail />
            <Contact />
        </div>
    )
}