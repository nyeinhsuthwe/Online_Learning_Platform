import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function CommentSession() {
    return (
        <div>
            <Card className="text-center gap-0 bg-sky-100 dark:bg-transparent">
                <span className=" text-[25px] text-text-primary dark:text-white font-semibold">Answer & Questions</span>
                <span>If you have to ask somthing, you can ask here!!</span>
                <div className="flex mx-auto gap-4">
                    <img src="/profile.jpg" className="w-13 h-13 rounded-full mt-9" />
                    <div>
                        <Textarea placeholder="Type your message here." id="message-2" className="mt-9 mb-4 w-150 h-40 bg-white text-text-primary"  />
                        <div className="flex justify-between">
                             <p className="text-muted-foreground text-sm flex gap-2 justify-center">
                            <Checkbox
                                defaultChecked
                                className="size-4 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700" />
                            Subscribe to get reply email notifications
                        </p>
                        <Button className="w-40 h-12 text-[16px] bg-primary-dark rounded-lg text-white hover:bg-primary-hover">
                            Comment
                        </Button>
                       </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}