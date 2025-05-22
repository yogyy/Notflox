import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === "development" && (
          <script async src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          defer
          src="/script.analytics.js"
          strategy="beforeInteractive"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </body>
    </Html>
  );
}
