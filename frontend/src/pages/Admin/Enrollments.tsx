import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useAdminEnrollments } from "@/common/adminApi";

const Enrollments = () => {
  const PAGE_SIZE = 8;
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminEnrollments();
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const confirmMutation = useApiMutation<{ enroll_id: string; status: string }, { message: string }>({
    onSuccess: () => {
      toast.success("Payment status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-enrollments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onConfirm = (id: string, status: string) => {
    confirmMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/confirm-status`,
      method: "POST",
      body: {
        enroll_id: id,
        status,
      },
    });
  };

  const enrollments = data?.data ?? [];
  const filteredEnrollments = useMemo(() => {
    if (statusFilter === "all") return enrollments;
    if (statusFilter === "rejected") {
      return enrollments.filter((enroll) => ["rejected", "reject"].includes(enroll.paymentStatus));
    }
    return enrollments.filter((enroll) => enroll.paymentStatus === statusFilter);
  }, [enrollments, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEnrollments.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedEnrollments = filteredEnrollments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Enrollments</h1>
        <p className="text-sm text-muted-foreground">Review enrollments and confirm payment status.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Enrollment List</CardTitle>
            <select
              className="h-9 rounded-md border bg-background px-3 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "paid" | "pending" | "rejected")}
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="rejected">Reject</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {paginatedEnrollments.map((enroll) => (
                <div key={enroll._id} className="space-y-2 rounded-md border p-3">
                  <p className="text-sm">
                    <span className="font-medium">Enroll ID:</span> {enroll._id}
                  </p>
                  <p className="text-sm text-muted-foreground">User: {enroll.user_id}</p>
                  <p className="text-sm text-muted-foreground">Course: {enroll.course_id}</p>
                  <p className="text-sm text-muted-foreground">Price: {enroll.price}</p>
                  <p className="text-sm text-muted-foreground">Payment Method: {enroll.paymentMethod || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">Status: {enroll.paymentStatus}</p>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => onConfirm(enroll._id, "paid")}>
                      Mark Paid
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onConfirm(enroll._id, "rejected")}>
                      Mark Rejected
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredEnrollments.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrollments;
