import React from 'react';
import Categories from './Categories';

interface LeftSidebarProps {}

const LeftSidebar: React.FC<LeftSidebarProps> = ({}) => {
  return (
    <div className='w-1/3 bg-gray-50 h-screen rounded-[7px] px-[20px] p-[15px]'>
      <div>
        <p className='text-[20px]'>Categories</p>
        <Categories />
      </div>
    </div>
  );
};

export default LeftSidebar;
