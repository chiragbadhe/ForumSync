import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-gray-50 shadow-md">
        <div className="container mx-auto h-[70px] flex items-center justify-between">
          <div className="flex space-x-[12px]">
            <p className="text-[22px] font-semibold">ForumSync</p>
          </div>

          <div className="flex">
            <input
              className="py-[5px] px-[12px] text-[18px] bg-gray-100 rounded-[6px] border w-[400px] border-black/20"
              type="text"
            />
            <button>
              <img src="" alt="" />
            </button>
          </div>

          <div className="flex space-x-[10px]">
            <Button>Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
