import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Navbar from './Navbar';
import RightSidebar from './RightSidebar';
import { motion } from 'framer-motion';

const LEFT_SIDEBAR_ITEMS = [
  {
    label: 'PROJECTS',
    right: [
      { label: 'ALL' },
      { label: 'FURNITURE' },
      { label: 'PRODUCT' },
      { label: 'SPACE' },
      { label: 'OTHERS' },
    ],
  },
  {
    label: 'NEWS',
    right: [
      { label: 'ALL' },
      { label: 'EXHIBITION' },
      { label: 'AWARD' },
      { label: 'NEW PROJECT' },
      { label: 'MEDIA' },
    ],
  },
  { label: 'PROFILE' },
  { label: 'PRESS' },
  { label: 'CONTACT' },
  { label: 'TAIYOU&C.' },
  { label: 'IMPLEMENTS' },
  { label: 'FACEBOOK' },
  { label: 'INSTAGRAM' },
];

const Scaffold = ({ children, handleTransition }) => {
  const [selectedLeft, setSelectedLeft] = useState(0);
  const [selectedRight, setSelectedRight] = useState(0);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [animationInProgress, setAnimationInProgress] =
    useState(true);

  return (
    <section
      className={`w-full h-full flex flex-col text-xs font-bold ${
        animationInProgress ? 'overflow-y-hidden' : ''
      }`}
    >
      <Navbar
        items={LEFT_SIDEBAR_ITEMS}
        selectedLeft={selectedLeft}
        selectedRight={selectedRight}
        isLeftOpen={isLeftOpen}
        setIsLeftOpen={setIsLeftOpen}
        isRightOpen={isRightOpen}
        setIsRightOpen={setIsRightOpen}
        handleTransition={handleTransition}
      />
      <motion.div
        key="main"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1 }}
        exit={{ y: '100%' }}
        // onAnimationStart={() => setAnimationInProgress(true)}
        onAnimationComplete={() => setAnimationInProgress(false)}
        className="relative flex flex-row justify-between h-full"
      >
        <LeftSidebar
          items={LEFT_SIDEBAR_ITEMS}
          selectedLeft={selectedLeft}
          setSelectedLeft={setSelectedLeft}
          isLeftOpen={isLeftOpen}
          setIsLeftOpen={setIsLeftOpen}
        />
        <div
          className={`w-full h-full ${
            isLeftOpen && 'translate-x-28 brightness-50'
          } ${isRightOpen && '-translate-x-28 brightness-50'}
           transition duration-500`}
        >
          {children}
        </div>
        <RightSidebar
          items={LEFT_SIDEBAR_ITEMS}
          selectedLeft={selectedLeft}
          selectedRight={selectedRight}
          setSelectedRight={setSelectedRight}
          isRightOpen={isRightOpen}
          setIsRightOpen={setIsRightOpen}
        />
      </motion.div>
    </section>
  );
};

export default Scaffold;
