import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { authState } from "~/atoms/auth-atoms";

export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useAtom(authState);

  return (
    <Card className="w-full max-w-[450px] rounded border-none bg-black/90 p-0 px-4 pb-4 text-white shadow-md max-[400px]:w-screen sm:px-16 sm:py-12">
      <CardHeader className="p-0">
        <div className="mt-3 flex w-full flex-col items-start justify-center gap-y-4">
          <h1 className="text-3xl font-semibold">Sign In</h1>
        </div>
      </CardHeader>
      <CardContent className="mt-8 gap-3 p-0">{children}</CardContent>
      <CardFooter className="mt-3 flex flex-col gap-3 p-0">
        {state === "login" ? (
          <Button
            onClick={() => setState("register")}
            variant="link"
            className="w-fit font-normal"
          >
            First time using Notflox?
          </Button>
        ) : (
          <Button
            onClick={() => setState("login")}
            variant="link"
            className="w-fit font-normal"
          >
            Already have an account?
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
