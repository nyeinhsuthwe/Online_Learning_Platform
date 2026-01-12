import { Card } from "@/components/ui/card";

export function DescriptPeriod() {
    return (
        <div className="space-y-4">
            <Card className=" grid grid-cols-2  py-2 px-7 shadow-[0_-1px_5px_rgba(0,0,0,0.04),0_1px_5px_rgba(0,0,0,0.04)] h-25 shadow-sky-200">
                <div className="flex flex-col justify-center space-y-1">
                    <span className="text-[14px] text-foreground">Instructor Name</span>
                    <span className="font-semibold text-accent-foreground">John Doe</span>
                </div>
                <div className="flex justify-end">
                    <img src="/profile.jpg" className="w-20 h-20 rounded-lg" alt="" />
                </div>
            </Card>

            <div className="grid grid-cols-3 gap-2">
                <Card className="py-2 px-7 h-20 gap-1 justify-center border-0 shadow border-b  border-r border-text-yellow">
                    <span className="text-[14px] text-foreground">Time Period</span>
                    <span className="font-semibold text-accent-foreground">3 months</span>
                </Card>
                <Card className="py-2 px-7 h-20 gap-1 justify-center border-0 shadow border-l  border-t border-primary-hover">
                    <span className="text-[14px] text-foreground">Course Duration</span>
                    <span className="font-semibold text-accent-foreground">20h 20m</span>
                </Card>
                <Card className="py-2 px-7 h-20 gap-1 justify-center border-0 shadow border-b  border-l border-green-400">
                    <span className="text-[14px] text-foreground">Course Fee</span>
                    <span className="font-semibold text-[21px] text-green-500">300000 MMK</span>
                </Card>
            </div>
        </div>
    )
}