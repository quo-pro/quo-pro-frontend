import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div
      className='absolute flex items-center justify-center bg-white/75 h-screen w-screen'
      style={{ zIndex: 999999 }}
    >
      <div className='flex items-center flex-col gap-4'>
        <span className='font-montserrat-alt1 font-semibold'>
          <Loader className='animate-spin mr-1' />
          Please wait...
        </span>
      </div>
    </div>
  );
};

export default Loading;
