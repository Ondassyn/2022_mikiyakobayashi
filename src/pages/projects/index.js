import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { DATA } from '@/data/data';
import Item from '@/components/Item';
import gsap from 'gsap';
import ProgressContext from '@/utils/ProgressContext';

const Projects = () => {
  const sectionRef = useRef();
  const { progress, setProgress } = useContext(ProgressContext);

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [colsNo, setColsNo] = useState();
  const [isAnimated, setIsAnimated] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(sectionRef?.current?.offsetWidth);
      setScreenHeight(sectionRef?.current?.offsetHeight);
    };

    setScreenWidth(sectionRef?.current?.offsetWidth);
    setScreenHeight(sectionRef?.current?.offsetHeight);

    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth) {
      if (screenWidth <= 700) {
        setColsNo(1);
      } else if (screenWidth <= 1000) {
        setColsNo(2);
      } else if (screenWidth <= 1300) {
        setColsNo(3);
      } else if (screenWidth <= 1600) {
        setColsNo(4);
      } else if (screenWidth <= 2000) {
        setColsNo(5);
      } else {
        setColsNo(6);
      }
    }
  }, [screenWidth]);

  useEffect(() => {
    if (loadedImages >= DATA?.length) {
      setTimeout(() => {
        const ctx = gsap.context(() => {
          gsap.to('.col', {
            duration: 1,
            stagger: 0.2,
            translateY: '0px',
            onComplete: () => {
              setIsAnimated(false);
            },
          });
        }, sectionRef);

        return () => ctx.revert();
      }, 200);
    }
    setProgress((loadedImages / DATA?.length) * 100);
  }, [colsNo, loadedImages]);

  return (
    <div
      ref={sectionRef}
      key="projects"
      className={`h-full bg-[#f9f9f9] ${
        isAnimated && 'overflow-hidden'
      } flex flex-col`}
    >
      <div className="w-full flex flex-row">
        {Array(colsNo)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`col flex flex-col ${
                colsNo === 1
                  ? 'w-full'
                  : colsNo === 2
                  ? 'w-1/2'
                  : colsNo === 3
                  ? 'w-1/3'
                  : colsNo === 4
                  ? 'w-1/4'
                  : colsNo === 5
                  ? 'w-1/5'
                  : 'w-1/6'
              }`}
              style={{ transform: `translateY(${screenHeight}px)` }}
            >
              {DATA?.filter((_, j) => (j - i) % colsNo === 0)?.map(
                (d) => (
                  <Item
                    key={d?.id}
                    datum={d}
                    setLoadedImages={setLoadedImages}
                  />
                )
              )}
            </div>
          ))}
      </div>
      {/* <div className="text-center font-normal tracking-widest">{`\u00A9 MIKIYA KOBAYASHI INC. All Rights Reserved.`}</div> */}
    </div>
  );
};

export default Projects;

Projects.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
