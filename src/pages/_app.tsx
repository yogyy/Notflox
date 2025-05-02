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
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

Router.events.on("routeChangeStart", (url) => {
  if (String(url).startsWith("/search")) return;
  nProgress.start();
});
Router.events.on("routeChangeError", (url) => {
  if (String(url).startsWith("/search")) return;
  nProgress.done();
});
Router.events.on("routeChangeComplete", (url) => {
  if (String(url).startsWith("/search")) return;
  nProgress.done();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const component = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <NuqsAdapter>
            {component}
            <Toaster theme="dark" />
          </NuqsAdapter>
        </QueryClientProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
