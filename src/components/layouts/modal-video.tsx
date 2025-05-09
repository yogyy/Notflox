import React from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/utils";
import { Movie } from "~/types/tmdb-type";
import { NextImage } from "../next-image";
import ReactPlayer from "react-player/youtube";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, imgUrl } from "~/constants/movie";
import { ModalVidDetails } from "./modal-video-details";
import { Dialog, Transition } from "@headlessui/react";
import { modalState, movieState } from "~/atoms/jotaiAtoms";

const ModalVid = ({ showDetail }: { showDetail?: boolean }) => {
  const [showModal, setShowModal] = useAtom(modalState);
  const [movie, setMovie] = useAtom(movieState);
  const [trailer, setTrailer] = React.useState("");
  const [videoError, setVideoError] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const { data, isLoading } = useQuery(["movie", movie?.id], () =>
    fetcher<Movie>(
      `${baseUrl}/${movie?.first_air_date ? "/tv" : "/movie"}/${
        movie?.id
      }?language=en-US&append_to_response=videos`,
    ),
  );

  React.useEffect(() => {
    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element) => element.type === "Trailer",
      );
      setTrailer(data.videos?.results[index]?.key);
      if (!data.videos?.results[index]?.key) {
        setVideoError(true);
        toast.error("Error", { description: "Trailer not available" });
      }
    }
  }, [data]);

  return (
    <>
      <Transition appear show={showModal} as={React.Fragment}>
        <Dialog as="div" className="relative z-30" onClose={handleClose}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>
          <div
            className={cn(
              "fixed inset-0 overflow-x-hidden overflow-y-scroll rounded-md scrollbar-hide",
              !showDetail && "",
            )}
          >
            <div className="flex min-h-full items-start justify-center text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cn(
                    "absolute top-[15%] w-[64rem] max-w-5xl transform rounded-2xl bg-background/95 text-left align-middle shadow-xl transition-all",
                    !showDetail && "rounded-none",
                  )}
                >
                  <div className="text-lg font-medium text-gray-300">
                    <button
                      type="button"
                      className="sr-only"
                      onClick={handleClose}
                    >
                      close modal
                    </button>
                    <div className="relative aspect-video h-auto w-full max-w-5xl focus:outline-none">
                      {trailer && !videoError ? (
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${trailer}`}
                          width="100%"
                          height="100%"
                          controls
                          style={{ background: "#121212" }}
                          playing={true}
                          volume={0.3}
                          onError={() => {
                            setVideoError(true);
                          }}
                        />
                      ) : (
                        <NextImage
                          src={`${imgUrl}/w1280/${
                            movie?.backdrop_path || movie?.poster_path
                          }`}
                          className="rounded-t-sm md:rounded-t"
                          alt={`${movie?.name || movie?.title} thumbnail`}
                        />
                      )}
                    </div>
                    {showDetail && (
                      <ModalVidDetails
                        loading={isLoading}
                        movie={data}
                        closeModal={handleClose}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalVid;
