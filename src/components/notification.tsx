import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { BellIcon } from "./icons/general";

const notif = atomWithStorage<boolean>("notif", false);

export const Notifications = () => {
  const [clicked, setClicked] = useAtom(notif);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setClicked(true)}
          className="group relative inline-flex items-center rounded-full p-1 text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          <span className="sr-only">notification</span>
          <BellIcon className="h-6 w-6 text-gray-300" />
          <div
            className={
              clicked
                ? ""
                : "absolute right-1 top-1 h-[7px] w-[7px] animate-pulse rounded-full bg-red-700"
            }
          />
        </TooltipTrigger>
        <TooltipContent
          align="end"
          sideOffset={10}
          className="rounded border-muted/20 bg-background/90 p-0"
        >
          <div className="rounded-sm p-4">
            <span className="flex items-center">
              <span className="text-sm font-medium text-gray-200">Greetings!</span>
            </span>
            <span className="block text-sm text-gray-400">
              Welcome to Notflox, enjoy surfing~
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
