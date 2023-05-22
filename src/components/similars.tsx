import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Recomend from './netflix1/recomend';
import { Paginate } from './Paginate';

interface SIMILAR {
  similar: number;
  type: string;
}

const Similars = ({ similar, type }: SIMILAR) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const { data, isLoading } = useQuery(['similar', similar], () =>
    axios.get(`/api/${type}/recommend/${similar}`).then(res => res.data.results)
  );

  const similarPaginate = data?.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [similar]);

  return (
    <>
      {data?.length !== 0 ? (
        <>
          {isLoading ? (
            <div className="flex-col mx-4 mt-1 frounded-sm">
              <p className="text-xl font-semibold text-[#fcfbfb]">
                Recommendations
              </p>
              <div className="w-32 h-4 bg-[#1c1c1c] animate-pulse mb-3 mt-2"></div>
              <div className="flex">
                <div className="relative aspect-[9/14] h-[150px] md:h-[249px] w-24 md:w-40 bg-[#1c1c1c] rounded mr-3 animate-pulse"></div>
                <div className="w-full">
                  <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                  <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                  <div className="w-5/6 h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <Recomend
                className=""
                title="Recommendations"
                movies={similarPaginate}
              />
              <Paginate
                currentPage={currentPage}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                totalPost={data?.length}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <h1 className="px-3 text-1xl">Recommendations not available</h1>
        </div>
      )}
    </>
  );
};

export default Similars;
