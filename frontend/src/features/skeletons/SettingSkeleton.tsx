import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function SettingSidebarSkeleton() {
  return (
    <Sidebar className="relative py-10 bg-card">
      <SidebarContent className="h-full">
        <SidebarGroup className="px-3 bg-card h-full">
          <SidebarGroupContent className="bg-card">
            <SidebarMenu>
              {Array.from({ length: 3 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <div
                    className="
                      grid grid-cols-[24px_auto]
                      items-center gap-3 h-14
                      rounded-md px-3
                    "
                  >
                    {/* Icon skeleton */}
                    <Skeleton className="h-5 w-5 rounded-md" />

                    {/* Text skeleton */}
                    <Skeleton className="h-4 w-32" />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
