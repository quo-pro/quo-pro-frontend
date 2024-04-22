import React, { ComponentType, ReactElement, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Authenticate from '@components/authentication/Authenticate';

interface AuthFallbackProps {
    Component: ComponentType<any>;
    Fallback: ComponentType<any>;
}

function withAuthFallback({ Component, Fallback }: AuthFallbackProps): ComponentType<any> {
    return function ProtectedRoute(props: any): ReactElement {
        const { status } = useSession();
        const [clientLoaded, setClientLoaded] = useState(false);

        useEffect(() => {
            setClientLoaded(true);
        }, []);

        if (!clientLoaded) {

            return <div>Loading...</div>;
        }

        if (status === 'authenticated') {
            return <Component {...props} />;
        } else {
            return <Authenticate>{<Fallback {...props} />}</Authenticate>;
        }
    };
}

export default withAuthFallback;
