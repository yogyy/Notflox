import * as React from 'react';

interface Props {
  totalPost: number;
  postPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const Paginate = ({ totalPost, postPerPage, setCurrentPage }: Props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="bg-red-700 flex justify-center gap-3 mt-2">
      {pages.map((page, index) => {
        return (
          <button
            className="py-1.5 px-3 bg-[#121212]"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
