import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { updateSearchParams } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  category: string;
}

export function PaginationComponent({
  totalPages,
  currentPage,
  category,
}: PaginationProps): JSX.Element {
  const handlePageClick = (page: number, e: React.MouseEvent): void => {
    e.preventDefault();
    window.history.pushState({}, "", updateSearchParams("page", `${page}`));
    window.location.reload();
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}&category=${category}`}
            isActive={currentPage === i}
            onClick={(e) => handlePageClick(i, e)}
            className="dark:text-white"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? `?page=${currentPage - 1}&category=${category}`
                : "#"
            }
            onClick={(e) =>
              currentPage > 1 && handlePageClick(currentPage - 1, e)
            }
          />
        </PaginationItem>

        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`?page=1&category=${category}`}
                onClick={(e) => handlePageClick(1, e)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink
                href={`?page=${totalPages}&category=${category}`}
                onClick={(e) => handlePageClick(totalPages, e)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? `?page=${currentPage + 1}&category=${category}`
                : "#"
            }
            onClick={(e) =>
              currentPage < totalPages && handlePageClick(currentPage + 1, e)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
