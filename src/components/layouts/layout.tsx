import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../navbar';
import { Poppins } from 'next/font/google';
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
      <header>
        <Navbar />
      </header>
      <main className={poppins.className}>{children}</main>
    </>
  );
};

export default RootLayout;
