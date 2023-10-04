import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface KW {
  id: number;
  name: string;
}

interface KEYWORDS {
  keyword: number;
  type: string;
}

const Keywords = ({ keyword, type }: KEYWORDS) => {
  const { data, isLoading } = useQuery([`keywords ${type}`, keyword], () =>
    axios
      .get(`/api/${type}/keyword/${keyword}`)
      .then(res => res.data.results || res.data.keywords)
  );

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap items-center gap-2 py-2 mx-3 mt-5 xl:mb-52">
          <h1>Keywords :</h1>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="relative w-20 h-5 bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center px-3 py-2 mt-5 xl:mb-52">
          <h1 className="px-3">Keywords :</h1>
          {data?.map((keyword: KW) => (
            <p
              key={keyword.id}
              className="px-2 m-1 text-gray-300 text-sm md:text-base rounded-md cursor-default bg-white/5 w-max hover:bg-white/10 hover:text-gray-200">
              {keyword.name}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Keywords;
