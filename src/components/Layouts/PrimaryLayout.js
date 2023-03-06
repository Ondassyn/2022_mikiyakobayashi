// import localFont from '@next/font/local';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Scaffold from '../Scaffold';
import styles from './PrimaryLayout.module.css';
import localFont from '@next/font/local';
import { AnimatePresence } from 'framer-motion';

const hiragino = localFont({
  src: [
    {
      path: '../../fonts/Hiragino Kaku Gothic Pro W3.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/Hiragino Kaku Gothic Pro W6.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/Hiragino Kaku Gothic StdN W8.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hiragino',
});

const PrimaryLayout = ({ children, handleTransition }) => {
  return (
    <>
      <Head>
        <title>MIKIYA KOBAYASHI</title>
        <meta name="description" content="MIKIYA KOBAYASHI" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${hiragino.variable} ${styles.scrollbar} bg-[#f9f9f9] font-sans text-[#1a1a1a] overflow-x-hidden h-screen
          absolute top-0 left-0 z-10 w-full`}
      >
        <Scaffold handleTransition={handleTransition}>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </Scaffold>
      </main>
    </>
  );
};

export default PrimaryLayout;
