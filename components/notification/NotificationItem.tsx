import React, { forwardRef, useMemo } from 'react';
import { INotification } from '@quo-pro/commons';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import AcceptedFriendRequestNotification from './AcceptedFriendRequestNotification';
import NewFriendRequestNotification from './NewFriendRequest';
import StatusUpdateNotification from './StausUpdateNotification';
import { Separator } from '@components/ui/separator';

interface ItemProps extends INotification { }
const NotificationItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {

    const NotificationRender = useMemo(() => {
        switch (props.type) {
            case 'NEW_FRIEND_REQUEST':
                return <NewFriendRequestNotification  {...props} />
            case 'ACCEPTED_FRIEND_REQUEST':
                return <AcceptedFriendRequestNotification {...props} />
            case 'MESSAGE':
            case 'POST':
            case 'STATUS_UPDATE':
                return <StatusUpdateNotification {...props} />
        }

    }, [props.type])

    return (
        <div ref={ref} className='flex flex-row justify-between w-full gap-2'>
            <ProfilePhoto className='h-6 w-6' user={props.sentBy} />
            <div className='flex-grow'>
                {NotificationRender}
            </div>
        </div>
    );
});

export default NotificationItem
