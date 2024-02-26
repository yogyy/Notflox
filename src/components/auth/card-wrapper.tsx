import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginState } from "~/atoms/auth-atoms";
import { Social } from "./social-auth";
import { Netflix } from "../icons";
import { useAtom } from "jotai";

export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [authLogin, setAuth] = useAtom(loginState);

  return (
    <Card className="w-[400px] border-zinc-600 bg-black/90 text-white shadow-md max-[400px]:w-screen md:border-black/90">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <Netflix className="h-6" />
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
      <CardFooter className="brightness-75">
        {authLogin && (
          <Button
            onClick={() => setAuth(false)}
            variant="link"
            className="w-full font-normal"
          >
            First time using Notflox?
          </Button>
        )}
        {!authLogin && (
          <Button
            onClick={() => setAuth(true)}
            variant="link"
            className="w-full font-normal"
          >
            Already have an account?
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
