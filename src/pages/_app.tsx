import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '@/styles/nprogress.css';
import { Router } from 'next/router';
import nProgress from 'nprogress';
import { PreloadProvider } from '@/components/PreloadContext';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <PreloadProvider>
          <Component {...pageProps} />
        </PreloadProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
