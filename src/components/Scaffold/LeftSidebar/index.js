import { useRouter } from 'next/router';
import React from 'react';

const LeftSidebar = ({
  items,
  selectedLeft,
  setSelectedLeft,
  isLeftOpen,
  setIsLeftOpen,
}) => {
  const router = useRouter();
  return (
    <section
      className={`h-full z-20 absolute w-56 transition duration-500 border ${
        isLeftOpen ? '' : '-translate-x-56'
      } px-8 py-12 bg-[#ffffff] flex flex-col gap-10 text-[.6rem] tracking-[.2rem]`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative group cursor-pointer px-1 w-fit"
          onClick={() => {
            setSelectedLeft(index);
            router.push('/projects');
            setIsLeftOpen(false);
          }}
        >
          <p className="ml-2">{item?.label}</p>
          <div
            className={`absolute top-[50%] h-[.09rem] w-full bg-[#1a1a1a] 
                ${
                  !(selectedLeft === index) && 'scale-x-0'
                } origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-500`}
          ></div>
        </div>
      ))}
    </section>
  );
};

export default LeftSidebar;
