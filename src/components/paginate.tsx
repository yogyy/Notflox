import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Paginate = ({
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
      className="flex items-center justify-center gap-3 pb-5 mt-2 bg-ireng/5"
      {...rest}>
      {pages.map((page, index) => {
        const isActive = page === currentPage;
        return (
          <Link
            href="#similar-container"
            className={cn(
              'w-3 h-3 p-2.5 text-xs my-2 inline-flex justify-center items-center bg-primary rounded-full border-2 focus:outline-none focus-within:border-white',
              isActive ? '' : 'border-transparent'
            )}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}>
            {page}
          </Link>
        );
      })}
    </div>
  );
};

export default Paginate;
