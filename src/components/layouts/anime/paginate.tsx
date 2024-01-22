import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Paginate: React.FC<Props> = (props) => {
  const { totalPost, postPerPage, currentPage, setCurrentPage } = props;
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(
    currentPage + (currentPage === 1 ? +2 : +1),
    pages.length,
  );
  const visiblePages = pages.slice(rangeStart - 1, rangeEnd);

  return (
    <Pagination className="mt-2 w-full scale-90 overflow-hidden overflow-x-scroll scrollbar-hide md:scale-100">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#recent-released"
            className={cn(
              currentPage <= 1
                ? "pointer-events-none opacity-50 focus-visible:ring-0"
                : "focus-visible:ring-primary",
            )}
            onClick={() => {
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        {visiblePages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page} className="">
              <PaginationLink
                href="#recent-released"
                isActive={isActive}
                onClick={() => setCurrentPage(page)}
                className={cn("focus-visible:ring-primary", isActive ? "" : "")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#recent-released"
            className={cn(
              currentPage === pages.length
                ? "pointer-events-none opacity-50 focus-visible:ring-0"
                : "focus-visible:ring-primary",
            )}
            onClick={() => {
              currentPage < pages.length && setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
