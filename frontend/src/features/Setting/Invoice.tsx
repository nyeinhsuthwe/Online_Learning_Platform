import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEnrollByUser } from "../../common/api";

const statusConfig: Record<string, any> = {
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="w-4 h-4" />,
  },
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
        <div className="grid gap-4 md:grid-cols-2">
          {invoices.map((invoice: any) => {
            const status = statusConfig[invoice.paymentStatus];

            return (
              <Card key={invoice._id} className="rounded-2xl shadow-sm h-60 justify-center">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    {invoice?.course_id.title}
                  </CardTitle>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-medium text-foreground">
                      {invoice.price.toLocaleString()} MMK
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="flex items-center gap-1 capitalize">
                      <Wallet className="w-4 h-4" /> {invoice.paymentMethod}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
