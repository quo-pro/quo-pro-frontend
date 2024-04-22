import Loading from '@/app/[locale]/Loading';
import React, { Suspense } from 'react';

function withSuspense(Component: any) {
  return function ProtectedRoute(props: any) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;
