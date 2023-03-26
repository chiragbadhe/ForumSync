import React from 'react';

interface RightSidebarProps {}

const RightSidebar: React.FC<RightSidebarProps> = ({}) => {
  return (
    <div className="w-1/3 bg-gray-50 h-screen rounded-[7px] px-[20px] p-[15px] border">
      <div>
        <p className="text-[20px] opacity-70">Subscriptions</p>
        <p className="border-b mt-[10px]"></p>
      </div>
      <div>
        <input className="border w-full rounded-[5px] mt-[12px] py-[5px] focus-none" type="text" />
      </div>
      <div className="bg-gray-100 border rounded-[5px] px-[10px] py-[5px] mt-[12px]">dff</div>
    </div>
  );
};

export default RightSidebar;
