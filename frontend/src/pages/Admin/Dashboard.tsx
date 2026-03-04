import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCategories, useAdminCourses, useAdminEnrollments, useAdminUsers } from "@/common/adminApi";

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of platform data.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Courses" value={courses.length} />
        <StatCard title="Categories" value={categories.length} />
        <StatCard title="Enrollments" value={enrolls.length} />
        <StatCard title="Users" value={users.length} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Paid enrollments: {paidEnrollments}</p>
          <p>Pending enrollments: {enrolls.length - paidEnrollments}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
