import Intro from '@/components/Intro';
import IntroLayout from '@/components/Layouts/IntroLayout';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Projects from './projects';
import localFont from '@next/font/local';

const hiragino = localFont({
  src: [
    {
      path: '../fonts/Hiragino Kaku Gothic Pro W3.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Hiragino Kaku Gothic Pro W6.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Hiragino Kaku Gothic StdN W8.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hiragino',
});

export default function Home() {
  const [renderedIntro, setRenderedIntro] = useState(true);
  const [renderedSite, setRenderedSite] = useState(false);

  const handleTransition = () => {
    setTimeout(() => {
      setRenderedIntro(false);
    }, 1000);
    setRenderedSite(true);

    window.history.pushState({}, '', '/projects');
  };

  const handleReverseTransition = () => {
    setRenderedSite(false);

    setRenderedIntro(true);

    window.history.pushState({}, '', '/');
  };

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
      <div
        className={`${hiragino.variable} font-sans text-[#1a1a1a] relative`}
      >
        <AnimatePresence mode="sync">
          {renderedIntro && (
            <Intro handleTransition={handleTransition} />
          )}
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {renderedSite && (
            <PrimaryLayout handleTransition={handleReverseTransition}>
              <Projects />
            </PrimaryLayout>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// Home.getLayout = function getLayout(page) {
//   return <PrimaryLayout show={false}>{page}</PrimaryLayout>;
// };
