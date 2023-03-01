import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const Item = ({ datum }) => {
  const itemRef = useRef();
  const [itemHeight, setItemHeight] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setItemHeight(itemRef?.current?.offsetWidth / 1.8);
    console.log(
      'itemRef?.current?.offsetWidth / 1.8',
      itemRef?.current?.offsetWidth / 1.8
    );
  }, [itemRef?.current?.offsetWidth]);

  useEffect(() => {
    const handleResize = () => {
      setItemHeight(itemRef?.current?.offsetWidth / 1.8);
    };

    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative w-1/5 cursor-pointer tracking-[.2rem] uppercase`}
      style={{
        height: itemHeight + 'px',
        overflow: 'hidden',
      }}
      onMouseOver={(e) => {
        e.currentTarget.querySelector(
          '.bg-layer'
        ).style.backgroundPosition = 'center 10%';
        e.currentTarget.querySelector('.text-layer').style.transform =
          'translateY(10%)';
        e.currentTarget.querySelector(
          '.text-layer'
        ).style.opacity = 1;
        e.currentTarget.querySelector('.bg-layer').style.filter =
          'brightness(50%)';
        setVisible(true);
      }}
      onMouseOut={(e) => {
        e.currentTarget.querySelector(
          '.bg-layer'
        ).style.backgroundPosition = 'center';
        e.currentTarget.querySelector('.text-layer').style.transform =
          'translateY(0)';
        e.currentTarget.querySelector(
          '.text-layer'
        ).style.opacity = 0;
        e.currentTarget.querySelector('.bg-layer').style.filter =
          'brightness(100%)';
        setVisible(false);
      }}
    >
      <div
        className="bg-layer absolute w-full h-full"
        style={{
          backgroundImage: `url(${
            datum?.images?.length ? datum?.images[0] : DEFAULT_IMG
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition:
            'background-position 0.3s ease-in-out, filter 0.3s ease-in-out',
        }}
      ></div>

      <div
        className="text-layer absolute w-full h-full flex flex-col gap-4 justify-center items-center text-white"
        style={{
          transition:
            'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: 0,
        }}
      >
        <p className="text-sm">{datum?.name}</p>
        <div className="h-[.15rem] w-4 bg-white"></div>
        <p className="text-xs">{datum?.author}</p>
      </div>
    </div>
  );
};

export default Item;
