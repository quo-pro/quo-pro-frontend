'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NAVIGATION from '@app/navigations/navigation';

function withClientAuth(Component: any) {
  return function ProtectedRoute(props: any) {
    const { status } = useSession();

    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;
      if (status === 'unauthenticated') {
        router.push(NAVIGATION.PUBLIC_FEEDS);
      }
    }, [status, router]);

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
}

export default withClientAuth;
