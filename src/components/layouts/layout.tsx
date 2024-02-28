import { Poppins } from "next/font/google";
import { HeadMetaData } from "@/components/head-meta";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Footer } from "./footer";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string | undefined;
  footer?: boolean;
}

const RootLayout = ({
  children,
  title,
  description,
  image,
  footer = true,
  className,
  ...props
}: LayoutProps) => {
  return (
    <>
      <HeadMetaData
        metaDescription={description}
        ogImageUrl={image}
        title={title}
      />
      <Header />
      <main
        className={cn(poppins.className, "min-h-dvh", className)}
        {...props}
      >
        {children}
      </main>
      {footer && <Footer />}
    </>
  );
};

export default RootLayout;
