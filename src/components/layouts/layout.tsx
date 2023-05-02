import Head from 'next/head';
import * as React from 'react';
import Navbar from '../navbar';
import { Poppins } from 'next/font/google';
import { getSession } from 'next-auth/react';
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
      <div className="bgpattern">
        <header>
          <Navbar />
        </header>
        <main className={poppins.className}>{children}</main>
      </div>
    </>
  );
};

export default RootLayout;
