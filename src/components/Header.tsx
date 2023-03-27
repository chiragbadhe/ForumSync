import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter()

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
          </div>

          <div className="flex space-x-[10px]">
            {user ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <>
                <Button onClick={() => router.push("/signin") }>Login</Button>
                <Button>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
