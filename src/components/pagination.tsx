import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewAll: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onViewAll,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center mt-12 gap-5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-[#FBEBB5] text-white rounded-md hover:bg-[#FBEBB5] disabled:opacity-50"
        >
          Prev
        </button>

        {/* Generate Dynamic Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((value) => (
          <button
            key={value}
            onClick={() => onPageChange(value)}
            className={`md:px-6 px-3 py-2 md:py-4 rounded-md ${
              currentPage === value ? 'bg-[#FBEBB5]' : 'bg-[#FFF9E5]'
            } tracking-wider text-lg md:text-xl`}
          >
            {value}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-[#FBEBB5] text-white rounded-md hover:bg-[#FBEBB5] disabled:opacity-50"
        >
          Next
        </button>

        {/* "View All" Button */}
        <button
          onClick={onViewAll}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Pagination;
