import * as React from "react";
import nProgress from "nprogress";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import { type AppProps } from "next/app";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Component {...pageProps} />
          <Toaster theme="dark" />
        </QueryClientProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
