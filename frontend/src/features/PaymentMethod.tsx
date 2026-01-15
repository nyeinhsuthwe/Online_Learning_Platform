import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApiMutation } from "@/hooks/useMutation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}


export function PaymentMethod() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedMethod, setSelectedMethod] = useState<string | null>("kbz");

    const EnrollMutation = useApiMutation({
        onSuccess: () => {
            toast.success("Successfully enrolled! Enjoy your codes.");
            navigate(-1);
        },
        onError: (err: unknown) => {
            if (typeof err === "object" && err !== null && "response" in err) {
                const message = (err as ApiError).response?.data?.message || "Something went wrong!";
                toast.error(message);
            } else {
                toast.error("Something went wrong!");
            }
        }

    });

    const onSubmit = () => {
        if (!selectedMethod) {
            toast.error("Please select a payment method!");
            return;
        }

        EnrollMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/enroll/${id}`,
            method: "POST",
            body: {
                paymentMethod: selectedMethod,
            },
        });
    };

    const paymentOptions = [
        { id: "kbz", label: "KBZ Pay", img: "/kbz.png" },
        { id: "wave", label: "Wave Pay", img: "/wave.png" },
        { id: "aya", label: "Aya Pay", img: "/aya.png" },
        { id: "cb", label: "CB Pay", img: "/cb.jpg" },
    ];

    return (
        <div className="space-y-4 mt-6">
            <span className="text-[20px] font-bold">Choose Payment Method</span>

            <div className="grid mt-6 grid-cols-2 gap-4">
                {paymentOptions.map((option) => (
                    <Card
                        key={option.id}
                        onClick={() =>
                            setSelectedMethod((prev) => (prev === option.id ? null : option.id))
                        }
                        className={`flex flex-row items-center gap-4 p-4 cursor-pointer border transition hover:border-blue-400 hover:shadow-md ${selectedMethod === option.id
                            ? "border-blue-500 shadow-md dark:bg-background"
                            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-background"
                            }`}

                    >
                        <img src={option.img} alt={option.label} className="w-10 h-10 rounded object-contain" />
                        <span className="text-[16px] font-medium">{option.label}</span>
                    </Card>
                ))}
            </div>

            <Button
                onClick={onSubmit}
                className="mt-5 w-full h-13 text-md font-bold bg-blue-500 text-white hover:bg-blue-600"
            >
                Confirm Payment
            </Button>
        </div>
    );
}
