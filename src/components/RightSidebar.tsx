import React from 'react';

interface RightSidebarProps {}

const RightSidebar: React.FC<RightSidebarProps> = ({}) => {
  return (
    <div className="w-1/3 bg-gray-50 h-screen rounded-[7px] px-[20px] p-[15px]">
      <div>
        <p className="text-[20px]">Subscriptions</p>
      </div>
    </div>
  );
};

export default RightSidebar;
