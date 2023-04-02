import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/router';
import Logo from './ui/Logo';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  topicHeader: any;
}

const Header: React.FC<HeaderProps> = ({ topicHeader }) => {
  console.log(topicHeader);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const isApiRoute = router.asPath.startsWith('/t');

  const isLoginPage = router.asPath.startsWith('/login');
  const isSignupPage = router.asPath.startsWith('/signup');
  return (
    <header>
      <div className="bg-gray-50 shadow-md fixed w-full z-20 ">
        <div className="container mx-auto h-[70px] flex items-center justify-between">
          {topicHeader?.fancy_title || isApiRoute ? (
            <div className="flex space-x-[12px]">
              <p className="text-[18px] font-medium">{topicHeader.fancy_title}</p>
            </div>
          ) : (
            <div className="flex space-x-[12px]">
              <Logo />
            </div>
          )}

          {isLoginPage || isSignupPage ? null : topicHeader?.fancy_title || isApiRoute ? (
            ''
          ) : (
            <div className="flex">
              <input
                className="py-[5px] px-[12px] text-[18px] bg-gray-100 rounded-[6px] border w-[400px] border-black/10"
                type="text"
              />
            </div>
          )}

          <div className="flex space-x-[10px]">
            {isLoginPage ? (
              <>
                <div onClick={() => router.push('/')} className="flex items-center hover:underline">
                  <ArrowLeft size={20} className="mr-[5px]" /> Go to home
                </div>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
              </>
            ) : isSignupPage ? (
              <>
                <div onClick={() => router.push('/')} className="flex items-center hover:underline">
                  <ArrowLeft size={20} className="mr-[5px]" /> Go to home
                </div>
                <Button onClick={() => router.push('/login')}>Login</Button>
                
              </>
            ) : user ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <>
                <Button onClick={() => router.push('/login')}>Login</Button>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-[70px]"></div>
    </header>
  );
};

export default Header;
