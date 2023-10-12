import Navbar from './navbar';
import { Poppins } from 'next/font/google';
import { HeadMetaData } from './head-meta';
import Footer from './footer';
import { HTMLAttributes } from 'react';
import { Toaster } from '../UI/toaster';
import { useSession } from 'next-auth/react';
import LoaderBlock from '../loader/loaderblock';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string | undefined;
  footer?: boolean;
}

const RootLayout = (props: LayoutProps) => {
  const {
    children,
    title,
    description,
    image,
    footer = true,
    className,
  } = props;

  const { data: session } = useSession();

  return (
    <>
      <HeadMetaData
        metaDescription={description}
        ogImageUrl={image}
        title={title}
      />
      {!session ? (
        <LoaderBlock className="bg-gradient-to-b from-ireng to-black" />
      ) : (
        <>
          <header className="sticky top-0 z-20">
            <Navbar />
          </header>
          <main className={(poppins.className, className)}>{children}</main>
          <Toaster />
          {footer && <Footer />}
        </>
      )}
    </>
  );
};

export default RootLayout;
