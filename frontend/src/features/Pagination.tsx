import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Props = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
};

export function Pagination({ page, totalPages, setPage }: Props) {
    const getPageNumbers = (current: number, total: number) => {
        const pages: (number | "ellipsis")[] = [];

        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        pages.push(1);

        if (current > 3) pages.push("ellipsis");

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (current < total - 2) pages.push("ellipsis");

        pages.push(total);

        return pages;
    };
    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-12">
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && setPage(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {getPageNumbers(page, totalPages).map((p, i) => (
                    <PaginationItem key={i}>
                        {p === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => setPage(p)}
                                className="cursor-pointer"
                            >
                                {p}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => page < totalPages && setPage(page + 1)}
                        className={
                            page === totalPages ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
