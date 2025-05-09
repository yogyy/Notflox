import { cn } from "@/lib/utils";
import { PlayListAdd, PlayListRemove } from "./icons/general";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Spinner } from "./icons/spinner";

interface Props {
  title: string;
  showId: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate: string | undefined;
}

export const ButtonWatchlists = (props: Props) => {
  const queryClient = useQueryClient();
  const { pathname } = useRouter();
  const showType = pathname.split("/")[1];
  const key = `${showType}/${props.showId}`;

  const { data, isLoading: loadingQuery } = useQuery<{ in_list: boolean }>(
    ["watchlist", key],
    () => fetch(`/api/watchlist/${key}`).then((res) => res.json()),
  );
  const { mutate, isLoading: loadingMutate } = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", key] });
      toast(data?.message, {
        classNames: { toast: "!bg-background/80 !justify-center" },
        position: "top-center",
      });
    },
    mutationFn: async () => {
      return fetch(`/api/watchlist/${key}`, {
        method: "POST",
        body: JSON.stringify({ ...props }),
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
        data?.in_list ? "bg-primary/70" : "bg-card/70",
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
