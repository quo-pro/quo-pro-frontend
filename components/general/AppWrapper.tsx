'use client';
import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

const AppWrapper: React.FC<{ children: ReactNode; locale: string }> = ({
  children,
}) => {

  return (
    <div className='flex flex-col w-full h-full min-h-screen'>
      <AppHeader />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default AppWrapper;
