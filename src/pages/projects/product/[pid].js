import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import { DATA } from '@/data/data';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import arrowLottie from '@/lotties/arrow.json';
import gridLottie from '@/lotties/grid.json';
import styles from '@/styles/Home.module.css';
import LottiePlayer from 'lottie-react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const Product = () => {
  const router = useRouter();
  const outerRef = useRef();
  const innerRef = useRef();
  const descRef = useRef();
  const arrowLeftRef = useRef();
  const arrowRightRef = useRef();
  const gridRef = useRef();
  const { pid } = router.query;
  const [product, setProduct] = useState(
    DATA?.find((d) => d?.id === pid)
  );
  const [productIndex, setProductIndex] = useState(
    DATA?.findIndex((d) => d?.id === pid)
  );
  const [animationInProgress, setAnimationInProgress] =
    useState(false);

  useEffect(() => {
    if (!product) {
      setProduct(DATA?.find((d) => d?.id === pid));
      setProductIndex(DATA?.findIndex((d) => d?.id === pid));
    }
  }, [pid]);

  function scrollInnerDiv() {
    innerRef.current.scrollTop = outerRef.current.scrollTop;
    descRef.current.scrollTop = outerRef.current.scrollTop;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.5 }}
      onAnimationStart={() => setAnimationInProgress(true)}
      onAnimationComplete={() => setAnimationInProgress(false)}
      key="product"
      ref={outerRef}
      onScroll={scrollInnerDiv}
      className={`h-[calc(100vh-64px)] flex flex-row ${
        animationInProgress ? 'overflow-hidden' : 'overflow-y-auto'
      } ${styles.scrollbar}`}
    >
      <div
        ref={innerRef}
        className="w-full h-fit flex flex-col bg-[#f9f9f9] p-5 gap-5"
      >
        {product?.images?.map((img, index) => (
          <img key={index} src={img} alt={'img-' + index} />
        ))}
      </div>
      <div
        ref={descRef}
        className="sticky top-0 flex flex-col h-[calc(100vh-64px)] overflow-hidden justify-between w-[32rem] bg-[#ffffff] tracking-wider leading-6"
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center p-2 border-b">
            <div
              className="w-14 cursor-pointer"
              onMouseEnter={() => {
                arrowLeftRef.current.play();
              }}
              onMouseLeave={() => {
                arrowLeftRef.current.stop();
              }}
              onClick={() => {
                const nextProductIndex =
                  (productIndex + DATA?.length - 1) % DATA?.length;
                const nextProduct = DATA[nextProductIndex];
                setProduct(nextProduct);
                setProductIndex(nextProductIndex);
                window.history.pushState(
                  {},
                  '',
                  `/projects/product/${nextProduct?.id}`
                );
              }}
            >
              <LottiePlayer
                lottieRef={arrowLeftRef}
                animationData={arrowLottie}
                autoplay={false}
                loop={false}
              />
            </div>
            <div
              className="w-8 cursor-pointer"
              onMouseEnter={() => {
                gridRef.current.playSegments([60, 120], true);
              }}
              onClick={() => router.push('/projects')}
            >
              <LottiePlayer
                lottieRef={gridRef}
                animationData={gridLottie}
                autoplay={false}
                loop={false}
              />
            </div>
            <div
              className="w-14 rotate-180 cursor-pointer"
              onMouseEnter={() => {
                arrowRightRef.current.play();
              }}
              onMouseLeave={() => {
                arrowRightRef.current.stop();
              }}
              onClick={() => {
                const nextProductIndex =
                  (productIndex + 1) % DATA?.length;
                const nextProduct = DATA[nextProductIndex];
                setProduct(nextProduct);
                setProductIndex(nextProductIndex);
                window.history.pushState(
                  {},
                  '',
                  `/projects/product/${nextProduct?.id}`
                );
              }}
            >
              <LottiePlayer
                lottieRef={arrowRightRef}
                animationData={arrowLottie}
                autoplay={false}
                loop={false}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-12 font-normal">
            <h1 className="font-bold text-base uppercase mb-4">
              {product?.name}
            </h1>
            <p className="text-base">{product?.author}</p>
            <p className="text-base">{product?.year}</p>
            <p className="text-base">{product?.type}</p>
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="text-center text-[10px] font-normal tracking-widest py-8">{`\u00A9 MIKIYA KOBAYASHI INC. All Rights Reserved.`}</div>
      </div>
    </motion.div>
  );
};

export default Product;

Product.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
