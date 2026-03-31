import { Contact } from "@/features/payment/Contact"
import { PaymentDetail } from "@/features/payment/PaymentDetail"

export function Enroll() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="section-title">Checkout</h2>
                <p className="section-subtitle">Review the course details and confirm your enrollment.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <PaymentDetail />
                <Contact />
            </div>
        </div>
    )
}
