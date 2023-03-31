import React from 'react';
import Categories from './Categories';

interface LeftSidebarProps {}

const LeftSidebar: React.FC<LeftSidebarProps> = ({}) => {
  return (
    <div className='w-2/5 fixed h-full relative left-0 top-0 bg-gray-50 rounded-[7px] px-[20px] p-[15px] border'>
      <div>
        <p className='text-[20px]'>Categories</p>
        <p className='border-b my-[10px]'></p>
        <Categories />
      </div>
    </div>
  );
};

export default LeftSidebar;
