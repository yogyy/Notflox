import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === "production" ? (
          <script
            defer
            src="/script.analytics.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          />
        ) : (
          <script
            async
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
