import React, { Children } from 'react';
import { ArrowUp, ArrowDown, Eye, MessageSquare } from 'lucide-react';
import { title } from 'process';

interface TopicCardProps {
  children: any;
  title: any;
  isLoading?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ children, title, isLoading }) => {
  return (
    <div className="w-full bg-gray-50 rounded-[7px] py-[30px] px-[30px] container flex mb-[20px] hover:shadow-md border">
      <div className="flex flex-col items-center pr-[20px] opacity-50 justify-center">
        <ArrowUp />
        <p className="text-[20px] font-normal">56</p>
        <ArrowDown />{' '}
      </div>
      <div>
        <p className="text-[18px] font-medium"> {title}</p>{' '}
        <p className="mt-[5px] text-[14px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolore eaque aspernatur quod velit, sequi
          iure quaerat amet dolorem dolor itaque voluptates nisi illum quis! Sit illum nesciunt corporis dolores.
        </p>
        <p className="border-b my-[13px] "></p>
        <div className="flex justify-between text-[14px] opacity-50">
          <p>
            <img src="#" alt="" />
            <span>Posted By: Jon Doe</span>
          </p>
          <p className="flex items-center space-x-[5px]">
            <Eye size={18} />
            <span>9.0k</span>
          </p>

          <p className="flex items-center space-x-[5px]">
            <MessageSquare size={18} />
            <span>50+</span>
          </p>

          <p>12 hr ago</p>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
