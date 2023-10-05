import Navbar from './Navbar';
import { Poppins } from 'next/font/google';
import { HeadMetaData } from './HeadMetaTag';
import Footer from './Footer';
import { HTMLAttributes } from 'react';
import { Toaster } from '../UI/toaster';
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

  return (
    <>
      <HeadMetaData
        metaDescription={description}
        ogImageUrl={image}
        title={title}
      />
      <>
        <header className="sticky top-0 z-20">
          <Navbar />
        </header>
        <main className={(poppins.className, className)}>{children}</main>
        <Toaster />
        {footer && <Footer />}
      </>
    </>
  );
};

export default RootLayout;
