import Link from 'next/link';
import * as React from 'react';

interface Props {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Paginate = ({
  totalPost,
  postPerPage,
  currentPage,
  setCurrentPage,
  ...rest
}: Props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div
      {...rest}
      className="bg-[#121212] flex justify-center items-center gap-3 mt-2"
    >
      {pages.map((page, index) => {
        const isActive = page === currentPage;
        return (
          <Link
            href="#similar-tv-container"
            className={`w-3 h-3 p-3 text-xs flex my-2 justify-center items-center bg-red-600 rounded-full ${
              isActive ? 'border-2' : ''
            }`}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
};
