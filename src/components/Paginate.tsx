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
      className="bg-[#1c1c1c] flex justify-center items-center gap-3 mt-2"
    >
      {pages.map((page, index) => {
        const isActive = page === currentPage;
        return (
          <button
            className={`w-3 h-3 p-3 text-xs flex my-2 justify-center items-center bg-red-600 rounded-full ${
              isActive ? 'border-2' : ''
            }`}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            <Link href="#similar-tv-container">{page}</Link>
          </button>
        );
      })}
    </div>
  );
};
