import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '@/data/data';
import Item from '@/components/Item';

const Projects = () => {
  return (
    <div key="projects" className="h-full bg-[#f9f9f9]">
      <div className="w-full flex flex-row flex-wrap">
        {DATA.map((d) => (
          <Item key={d?.name} datum={d} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

Projects.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
