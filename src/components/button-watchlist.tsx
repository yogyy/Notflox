import { cn } from "@/lib/utils";
import { PlayListAdd, PlayListRemove } from "./icons/general";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Spinner } from "./icons";

interface Props {
  title: string;
  showId: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate: string | undefined;
}

export const ButtonWatchlists = (props: Props) => {
  const { asPath } = useRouter();
  const queryClient = useQueryClient();
  const currentRoute = asPath.split("?")[0];
  const { data, isLoading: loadingQuery } = useQuery<{ in_list: boolean }>(
    ["watchlist", asPath],
    () => fetch(`/api/${currentRoute}/watchlist`).then((res) => res.json()),
  );
  const { mutate, isLoading: loadingMutate } = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", asPath] });
      toast(data?.message, {
        classNames: { toast: "!bg-background/80 !justify-center" },
        position: "top-center",
      });
    },
    mutationFn: async () => {
      return fetch("/api/watchlist/post", {
        method: "POST",
        body: JSON.stringify({ ...props, mediaType: asPath.split("/")[1] }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    },
  });

  return (
    <Button
      variant="ghost"
      type="button"
      title={data?.in_list ? "Remove from Watchlist" : "Add to Watchlist"}
      disabled={loadingQuery || loadingMutate}
      className={cn(
        data?.in_list ? "bg-primary" : "bg-card",
        "w-32 justify-between sm:w-40",
      )}
      onClick={() => mutate()}
    >
      {loadingQuery ? (
        <Spinner className="w-full animate-spin place-self-center" />
      ) : (
        <>
          {data?.in_list ? "Remove" : "Add"}
          {data?.in_list ? (
            <PlayListRemove className="h-5 w-5" />
          ) : (
            <PlayListAdd className="h-5 w-5" />
          )}
        </>
      )}
    </Button>
  );
};
