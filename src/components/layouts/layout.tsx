import { Poppins } from "next/font/google";
import { HeadMetaData } from "@/components/head-meta";
import { HTMLAttributes } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import { LoaderBlock } from "@/components/loader";
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

const RootLayout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  image,
  footer = true,
  className,
  ...props
}) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <HeadMetaData
          metaDescription={description}
          ogImageUrl={image}
          title={title}
        />
        <LoaderBlock className="bg-gradient-to-b from-ireng to-black" />
      </>
    );
  }

  return (
    <>
      <HeadMetaData
        metaDescription={description}
        ogImageUrl={image}
        title={title}
      />
      <Header />
      <main className={cn(poppins.className, className)} {...props}>
        {children}
      </main>
      <Toaster />
      {footer && <Footer />}
    </>
  );
};

export default RootLayout;
