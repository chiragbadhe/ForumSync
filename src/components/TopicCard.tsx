import React from 'react';
import { ArrowUp, ArrowDown, Eye, MessageSquare } from 'lucide-react';

interface TopicCardProps {
  title: string;
  isLoading?: boolean;
  views: number;
  posts_count: number;
  excerpt: string;
  like_count: number;
  last_posted_by: string;
  createdAt: string;
}

interface TimeAgoProps {
  date: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const now = new Date().getTime();
  const diff = now - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  let timeAgo;
  if (days >= 1 && months < 3) {
    timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (months >= 3) {
    timeAgo = new Date(date).toLocaleDateString();
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  return <span>{timeAgo}</span>;
};
const TopicCard: React.FC<TopicCardProps> = ({
  title,
  isLoading,
  views,
  posts_count,
  excerpt,
  like_count,
  last_posted_by,
  createdAt,
}) => {
  return (
    <div className="w-full bg-gray-50 rounded-[7px] py-[30px] px-[30px] container flex mb-[20px] hover:shadow-md border">
      <div className="flex flex-col items-center pr-[20px] opacity-50 justify-center">
        <ArrowUp />
        <p className="text-[20px] font-normal">{like_count}</p>
        <ArrowDown />
      </div>
      <div className="w-full">
        <p className="text-[18px] font-medium">{title}</p>
        <p className="mt-[5px] text-[14px]">{excerpt}</p>
        <p className="border-b my-[13px]"></p>
        <div className="flex justify-between text-[14px] opacity-50">
          <p className='overflow w-[200px]'>
            <img src="#" alt="" />
            <span>Last Posted By: {last_posted_by}</span>
          </p>
          <p className="flex items-center space-x-[5px]">
            <Eye size={18} />
            <span>{views}</span>
          </p>
          <p className="flex items-center space-x-[5px]">
            <MessageSquare size={18} />
            <span>{posts_count}</span>
          </p>
          <p>
            <TimeAgo date={createdAt} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
