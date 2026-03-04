import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useApiMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useAdminUsers } from "@/common/adminApi";
import { useUserStore } from "@/store/user";

const Users = () => {
  const PAGE_SIZE = 8;
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminUsers();
  const { user: currentUser } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);

  const deleteMutation = useApiMutation<undefined, { success: boolean }>({
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const roleMutation = useApiMutation<{ role: "user" | "admin" }, { success: boolean; message: string }>({
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onDelete = (id: string) => {
    deleteMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete/${id}`,
      method: "DELETE",
    });
  };

  const onRoleChange = (id: string, role: "user" | "admin") => {
    roleMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/update-role/${id}`,
      method: "PUT",
      body: { role },
    });
  };

  const users = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">Manage registered users.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {paginatedUsers.map((user) => (
                <div key={user._id} className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      className="h-8 rounded-md border px-2 text-xs"
                      value={user.role}
                      disabled={currentUser?._id === user._id || roleMutation.isPending}
                      onChange={(e) => onRoleChange(user._id, e.target.value as "user" | "admin")}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>

                    {user.role !== "admin" ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete user?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove the user account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDelete(user._id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <span className="text-xs text-muted-foreground">Protected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && users.length > 0 && (
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

export default Users;
