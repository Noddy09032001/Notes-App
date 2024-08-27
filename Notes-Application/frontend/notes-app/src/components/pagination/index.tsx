import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface TableProps {
  totalPages: number;
  page: number;
  onPageChange: (c: number) => void;
  className?: string;
}
export const TablePagination: React.FC<TableProps> = ({
  totalPages,
  page,
  onPageChange,
  className,
}) => {
  const [activePage, setActivePage] = useState(page);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onPageChange(page - 1);
              setActivePage(page - 1);
            }}
            className={className}
            disabled={!(totalPages !== 0 && page > 0)}
          >
            <ChevronLeft size="20" />
          </Button>
        </PaginationItem>
        {Array.from({ length: 2 }).map((_, index) => {
          const currentPage = page; // current page
          // Check if we are on the last or second-to-last page
          const isAtEnd = currentPage >= totalPages - 2;
          const nextPage = isAtEnd
            ? totalPages - 2 + index
            : currentPage + index;

          // Make sure the page numbers are within valid range
          if (nextPage >= totalPages || nextPage < 0) return null;

          return (
            <PaginationItem key={nextPage}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(nextPage)}
                className={nextPage === page ? "border-ciPurple border-2" : ""}
              >
                {nextPage + 1}
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onPageChange(page + 1);
              setActivePage(page + 1);
            }}
            className={className}
            disabled={!(totalPages !== 0 && totalPages !== page + 1)}
          >
            <ChevronRight size="20" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
