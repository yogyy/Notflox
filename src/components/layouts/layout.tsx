import Head from 'next/head';
import * as React from 'react';
import Navbar from '../navbar';
import { Poppins } from 'next/font/google';
import { getSession } from 'next-auth/react';
import Footer from '../footer';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const RootLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <Head>
        <title>{`${title} | NOTFLOX`}</title>
      </Head>
      <div className="bgpattern relative">
        <header className="sticky top-0 z-20">
          <Navbar />
        </header>
        <main className={poppins.className}>{children}</main>
        <footer>
          <div className="w-full h-20 bg-[#121212] mt-5">
            <Footer />
          </div>
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
