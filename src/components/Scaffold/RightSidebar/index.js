import React from 'react';

const RightSidebar = ({
  items,
  selectedLeft,
  selectedRight,
  setSelectedRight,
  isRightOpen,
}) => {
  return (
    <section
      className={`absolute z-20 h-full right-0 w-56 transition duration-500 
      ${isRightOpen ? '' : 'translate-x-56'}
       bg-[#ffffff] text-[.6rem] tracking-[.2rem]`}
    >
      <div className="flex flex-col">
        {items[selectedLeft]?.right?.length &&
          items[selectedLeft]?.right.map((item, index) => (
            <div
              key={index}
              className={`relative cursor-pointer w-full h-full px-12 py-5 ${
                selectedRight === index
                  ? 'bg-[#f3f3f3]'
                  : 'hover:bg-[#f3f3f3]'
              }`}
              onClick={() => setSelectedRight(index)}
            >
              <p className="ml-2">{item?.label}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default RightSidebar;
