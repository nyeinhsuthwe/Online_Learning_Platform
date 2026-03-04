import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useAdminCategories } from "@/common/adminApi";

const Categories = () => {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminCategories();

  const createMutation = useApiMutation<{ name: string }, { message: string }>({
    onSuccess: () => {
      toast.success("Category created");
      setName("");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useApiMutation<{ name: string }, { msg: string }>({
    onSuccess: () => {
      toast.success("Category updated");
      setEditingId(null);
      setEditingName("");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useApiMutation<undefined, { msg: string }>({
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onCreate = () => {
    if (!name.trim()) return toast.error("Category name is required");

    createMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-category`,
      method: "POST",
      body: { name: name.trim() },
    });
  };

  const onUpdate = (id: string) => {
    if (!editingName.trim()) return toast.error("Category name is required");

    updateMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/update-category/${id}`,
      method: "PUT",
      body: { name: editingName.trim() },
    });
  };

  const onDelete = (id: string) => {
    deleteMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-category/${id}`,
      method: "DELETE",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground">Create and manage categories.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="sm:max-w-md"
          />
          <Button onClick={onCreate} disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {(data?.data ?? []).map((category) => (
                <div key={category._id} className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
                  {editingId === category._id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="sm:max-w-sm"
                    />
                  ) : (
                    <p className="font-medium">{category.name}</p>
                  )}

                  <div className="flex gap-2">
                    {editingId === category._id ? (
                      <>
                        <Button size="sm" onClick={() => onUpdate(category._id)} disabled={updateMutation.isPending}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(category._id);
                            setEditingName(category.name);
                          }}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete category?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDelete(category._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
