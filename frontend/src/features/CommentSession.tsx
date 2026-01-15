import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function CommentSession() {
    return (
        <div>
            <Card className="text-center gap-2 bg-sky-100 dark:bg-transparent p-4 sm:p-6 md:p-8">

                {/* Title */}
                <div className="space-y-1 flex flex-col">
                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary dark:text-white">
                        Answer & Questions
                    </span>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        If you have a question, you can ask here!
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
                    <img
                        src="/profile.jpg"
                        alt="User profile"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto sm:mx-0"
                    />

                    <div className="flex flex-col flex-1">
                        <Textarea
                            placeholder="Type your message here."
                            id="message-2"
                            className="w-full h-32 sm:h-40 bg-white text-text-primary dark:text-white resize-none"
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2 sm:gap-0">
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <Checkbox
                                    defaultChecked
                                    className="w-4 h-4 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                Subscribe to get reply email notifications
                            </p>

                            <Button className="w-full sm:w-40 h-10 sm:h-12 text-[14px] sm:text-[16px] bg-primary-dark rounded-lg text-white hover:bg-primary-hover">
                                Comment
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
