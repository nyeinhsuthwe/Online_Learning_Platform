import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCategories, useAdminCourses, useAdminEnrollments, useAdminUsers } from "@/common/adminApi";
import { BookOpen, Tags, Wallet, Users } from "lucide-react";

const StatCard = ({
  title,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  title: string;
  value: number;
  helper: string;
  icon: typeof BookOpen;
  tone: string;
}) => (
  <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${tone} text-white shadow-sm`}>
    <div className="absolute right-4 top-4 rounded-2xl bg-white/15 p-2">
      <Icon size={18} />
    </div>
    <CardHeader className="pb-0">
      <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-white/75">{helper}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { data: categoriesRes } = useAdminCategories();
  const { data: coursesRes } = useAdminCourses();
  const { data: enrollsRes } = useAdminEnrollments();
  const { data: usersRes } = useAdminUsers();

  const categories = categoriesRes?.data ?? [];
  const courses = coursesRes?.data ?? [];
  const enrolls = enrollsRes?.data ?? [];
  const users = usersRes?.data ?? [];

  const paidEnrollments = enrolls.filter((enroll) => enroll.paymentStatus === "paid").length;
  const pendingEnrollments = enrolls.length - paidEnrollments;
  const recentCourses = courses.slice(0, 4);
  const latestUsers = users.slice(0, 4);
  const categoryMap = new Map(categories.map((category) => [category._id, category.name]));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">A real-time snapshot of your learning platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Courses"
          value={courses.length}
          helper="Published and in draft"
          icon={BookOpen}
          tone="from-slate-900 via-slate-800 to-slate-700"
        />
        <StatCard
          title="Categories"
          value={categories.length}
          helper="Organized learning paths"
          icon={Tags}
          tone="from-indigo-600 via-indigo-500 to-sky-400"
        />
        <StatCard
          title="Enrollments"
          value={enrolls.length}
          helper="Total learners onboarded"
          icon={Wallet}
          tone="from-emerald-600 via-emerald-500 to-teal-400"
        />
        <StatCard
          title="Users"
          value={users.length}
          helper="Active platform accounts"
          icon={Users}
          tone="from-rose-600 via-pink-500 to-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border border-border/60 bg-background/70 shadow-sm">
          <CardHeader>
            <CardTitle>Enrollment Health</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200/40 bg-emerald-500/10 p-4 text-emerald-900 dark:text-emerald-100">
              <p className="text-sm font-medium">Paid Enrollments</p>
              <p className="mt-2 text-2xl font-semibold">{paidEnrollments}</p>
            </div>
            <div className="rounded-xl border border-amber-200/40 bg-amber-400/10 p-4 text-amber-900 dark:text-amber-100">
              <p className="text-sm font-medium">Pending Enrollments</p>
              <p className="mt-2 text-2xl font-semibold">{pendingEnrollments}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-background/70 shadow-sm">
          <CardHeader>
            <CardTitle>Latest Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {latestUsers.length === 0 ? (
              <p>No users yet.</p>
            ) : (
              latestUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-1 text-[11px] uppercase tracking-wide">{user.role}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/60 bg-background/70 shadow-sm">
        <CardHeader>
          <CardTitle>Courses at a Glance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {recentCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses created yet.</p>
          ) : (
            recentCourses.map((course) => (
              <div key={course._id} className="rounded-xl border border-border/50 bg-background/80 p-3">
                <p className="text-sm font-semibold text-foreground line-clamp-2">{course.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{categoryMap.get(course.category_id) || "Uncategorized"}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Price: <span className="font-medium text-foreground">{course.price > 0 ? `$${course.price}` : "Free"}</span>
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
