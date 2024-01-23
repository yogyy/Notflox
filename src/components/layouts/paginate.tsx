import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginateProps {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  id_href: string;
}

export const Paginate: React.FC<PaginateProps> = (props) => {
  const { totalPost, postPerPage, currentPage, setCurrentPage, id_href } =
    props;
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
    <Pagination className="mt-2 w-full scale-90 overflow-hidden overflow-x-scroll pb-2 scrollbar-hide md:scale-100">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={id_href}
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
                href={id_href}
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
            href={id_href}
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
