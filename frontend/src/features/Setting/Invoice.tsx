import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEnrollByUser } from "../../common/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
};

export function Invoice() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useEnrollByUser(page, limit);

  const invoices = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Invoices</h1>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <div className="h-6 bg-muted rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice: any) => (
                <TableRow key={invoice._id} className="h-15">
                  <TableCell className="text-[16px]">
                    {invoice.course_id?.title ?? "Course"}
                  </TableCell>

                  <TableCell>
                    {invoice.price.toLocaleString()} MMK
                  </TableCell>

                  <TableCell className="text-[16px]">
                    {invoice.paymentMethod}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColor[invoice.paymentStatus]}
                    >
                      {invoice.paymentStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-12">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
        <ChevronLeft/>
        </Button>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <ChevronRight/>
        </Button>
      </div>
    </div>
  );
}
