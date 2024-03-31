import { HeadMetaData } from "@/components/head-meta";
import { Header } from "./header";
import { Footer } from "./footer";

interface LayoutProps {
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
}: LayoutProps) => {
  return (
    <>
      <HeadMetaData
        metaDescription={description}
        ogImageUrl={image}
        title={title}
      />
      <Header />
      <main className="min-h-dvh">{children}</main>
      {footer && <Footer />}
    </>
  );
};

export default RootLayout;
