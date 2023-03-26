import React from 'react';
import Categories from './Categories';

interface LeftSidebarProps {}

const LeftSidebar: React.FC<LeftSidebarProps> = ({}) => {
  return (
    <div className='max-w-xs bg-gray-50 h-full rounded-[7px] px-[20px] p-[15px] border'>
      <div>
        <p className='text-[20px]'>Categories</p>
        <p className='border-b my-[10px]'></p>
        <Categories />
      </div>
    </div>
  );
};

export default LeftSidebar;
