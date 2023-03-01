import LottiePlayer from 'lottie-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import hamburgerLottie from '../../../lotties/hamburger-menu.json';
import searchLottie from '../../../lotties/search.json';
import { motion } from 'framer-motion';

// https://assets8.lottiefiles.com/packages/lf20_98J91C/15_hamburger.json

const Navbar = ({
  items,
  selectedLeft,
  selectedRight,
  isLeftOpen,
  setIsLeftOpen,
  isRightOpen,
  setIsRightOpen,
  handleTransition,
}) => {
  const hamburgerRef = useRef();
  const sectionRef = useRef();
  const searchRef = useRef();
  const router = useRouter();

  return (
    <motion.div
      ref={sectionRef}
      key="navbar"
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}
      exit={{ y: '-100%' }}
      className="bg-[#ffffff] h-16 flex flex-row justify-between items-center pl-4 pr-8 border-b"
    >
      <div
        className="flex flex-row items-center gap-4 w-56 cursor-pointer"
        onClick={() => {
          if (isLeftOpen) {
            hamburgerRef.current.playSegments([132, 192], true);
            setIsLeftOpen(false);
          } else {
            hamburgerRef.current.playSegments([48, 96], true);
            setIsLeftOpen(true);
            setIsRightOpen(false);
          }
        }}
        onMouseEnter={() => {
          if (!isLeftOpen)
            hamburgerRef.current.playSegments([58, 48], true);
        }}
      >
        <div className="h-14 w-14">
          <LottiePlayer
            lottieRef={hamburgerRef}
            animationData={hamburgerLottie}
            autoplay={false}
            loop={false}
          />
        </div>
        <div className="text-[.6rem] tracking-[.2rem]">
          {items[selectedLeft]?.label}
        </div>
      </div>

      <div
        className="relative group tracking-[.4rem] cursor-pointer px-6 flex flex-row justify-center"
        onClick={() => {
          if (handleTransition) handleTransition();
          else {
            router.push('/');
          }
        }}
      >
        <p>MIKIYA KOBAYASHI</p>
        <div
          className="absolute top-[50%] w-full h-[.09rem] bg-[#1a1a1a] 
          scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-500"
        ></div>
      </div>

      {items[selectedLeft]?.right?.length ? (
        <div
          className="flex flex-row items-center justify-end gap-4 w-56 cursor-pointer"
          onClick={() => {
            if (isRightOpen) {
              setIsRightOpen(false);
            } else {
              setIsRightOpen(true);
              setIsLeftOpen(false);
            }
          }}
        >
          <div className="h-4 w-4 cursor-pointer">
            <LottiePlayer
              lottieRef={searchRef}
              animationData={searchLottie}
              autoplay={true}
              loop={false}
            />
          </div>
          <div className="text-[.6rem] tracking-[.2rem]">
            {items[selectedLeft]?.right[selectedRight]?.label}
          </div>
        </div>
      ) : (
        <div className="w-56"></div>
      )}
    </motion.div>
  );
};

export default Navbar;
