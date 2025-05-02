import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

export const HeadMetaData = ({
  title = "Movie Lists",
  metaDescription = "Experience the world of cinema through our movie consumption app. Explore a vast collection of movies sourced from a reliable API. Dive into a diverse selection of films, genres, and more. Stream seamlessly and enjoy the magic of the movies. Discover your next favorite film today!",
  ogImageUrl = "https://res.cloudinary.com/dpegakmzh/image/upload/v1683377050/Group-3copyhero_wlchnc.jpg",
}: MetaProps) => {
  const defaultTitle = "Notflox";
  const { asPath } = useRouter();
  const pageUrl =
    process.env.NODE_ENV === "development"
      ? `localhost:3000${asPath}`
      : `https://notflox.vercel.app${asPath}`;

  return (
    <Head>
      <title>{title + " | " + defaultTitle}</title>

      <meta name="title" content={title + " | " + defaultTitle} />
      <meta name="description" content={metaDescription} />
      <link rel="canocial" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:title" content={title + " | " + defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@yogyyconst" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title + " | " + defaultTitle} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="twitter:description" content={metaDescription} />
      <meta
        name="google-site-verification"
        content="i4B2HfZkJ5OMpMb2g_Wl_f1FhG20vVeosG16Pd3jBqU"
      />
    </Head>
  );
};
