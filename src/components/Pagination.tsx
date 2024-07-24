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

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
      // Render first 3 pages, ellipsis, and last page if necessary
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);

      if (currentPage > 2) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href={`?page=1&category=${category}`}
              isActive={currentPage === 1}
              onClick={(e) => handlePageClick(1, e)}
              className="dark:text-white"
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (currentPage > 3) {
          pageNumbers.push(<PaginationEllipsis key="ellipsis1" />);
        }
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

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push(<PaginationEllipsis key="ellipsis2" />);
        }

        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={`?page=${totalPages}&category=${category}`}
              isActive={currentPage === totalPages}
              onClick={(e) => handlePageClick(totalPages, e)}
              className="dark:text-white"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <div className="hidden lg:flex">
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

          {renderPageNumbers()}

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
        </div>

        {/* Mostrar solo en dispositivos móviles */}
        <div className="lg:hidden flex space-x-1">
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
              className="p-2"
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              isActive={currentPage === currentPage}
              className="dark:text-white"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
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
              className="p-2"
            />
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
