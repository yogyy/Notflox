import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>NOTFLOX</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="relative">{children}</main>
    </>
  );
};

export default RootLayout;
