import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface KW {
  id: number;
  name: string;
}

interface KEYWORDS extends React.ComponentProps<"div"> {
  keyword: number;
  type: string;
}

export const Keywords: React.FC<KEYWORDS> = ({
  keyword,
  type,
  className,
  ...props
}) => {
  const { data, isLoading } = useQuery([`keywords ${type}`, keyword], () =>
    axios
      .get(`/api/${type}/keyword/${keyword}`)
      .then((res) => res.data.results || res.data.keywords),
  );

  if (isLoading) {
    return (
      <div className="mx-3 mt-5 flex flex-wrap items-center gap-2 py-2 xl:mb-52">
        <h1>Keywords :</h1>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="relative h-5 w-20 animate-pulse bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center px-3 py-2 xl:mb-52",
        className,
      )}
      {...props}
    >
      <h1 className="px-3">Keywords :</h1>
      {data?.map((keyword: KW) => (
        <p
          key={keyword.id}
          className="m-1 w-max cursor-default rounded-md bg-white/5 px-2 text-sm text-gray-300 hover:bg-white/10 hover:text-gray-200 md:text-base"
        >
          {keyword.name}
        </p>
      ))}
      {data.length === 0 && <p>keywords no available</p>}
    </div>
  );
};
