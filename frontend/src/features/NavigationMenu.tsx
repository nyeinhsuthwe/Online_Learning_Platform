import { useChapter, useEpisode } from "@/common/api";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Navigation = ({ courseId }: { courseId: string, chapterId?:string }) => {
    const { data: chapters } = useChapter(courseId);
    const chapterCount = chapters?.data?.length || 0;
    const firstChapterId = chapters?.data?.[0]?._id || '';

    const { data: episode } = useEpisode(firstChapterId );
    const lessonCount = episode?.data?.length || 0;

    return (
        <div className="flex gap-1">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-foreground text-sm px-2 ">{chapterCount} Chapters</NavigationMenuTrigger>
                        <NavigationMenuContent >
                            <NavigationMenuLink >This course has {chapterCount}chapters.</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-foreground text-sm px-2 ">{lessonCount} Lessons</NavigationMenuTrigger>
                        <NavigationMenuContent >
                            <NavigationMenuLink >This course has {lessonCount} episodes.</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    )
}

export default Navigation
