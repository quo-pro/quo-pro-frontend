import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { INotification } from '@quo-pro/commons';

interface SocketHookProps {
    onEventReceived: (data: INotification) => void;
}

export function useSocket({ onEventReceived }: SocketHookProps) {
    const { data: session } = useSession();
    const socketRef = useRef<Socket | null>(null);

    const handleEvent = useCallback((event: INotification) => {
        onEventReceived(event);
    }, [onEventReceived]);

    useEffect(() => {
        if (!session?.accessToken) {
            return;
        }

        if (socketRef.current) {
            return;
        }

        const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_API}`, {
            extraHeaders: {
                'access-token': session.accessToken
            }
        });

        socket.on('connect', () => console.log('WebSocket connected.'));
        socket.on('disconnect', () => console.log('WebSocket disconnected.'));
        socket.on(session.user.id, handleEvent);

        socketRef.current = socket;

        return () => {
            console.log('Cleaning up socket connection...');
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    return { socket: socketRef.current };
}
