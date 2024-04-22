import withAuthFallback from '@app/HOFs/client/withAuthFallback';
import { useCreateFriendRequest, useUpdateFriendRequest } from '@app/resources/follow-request/mutation';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import { FRIEND_REQUEST_STATUS_TYPE, IUser } from '@quo-pro/commons'
import { useTranslations } from 'next-intl';
import React, { forwardRef, useMemo } from 'react'

interface ItemProps extends IUser { }
type TUser = IUser & {
    isFriend: boolean;
    isPendingFriendRequest: boolean;
    friendRequestId: string;
    isLoggedInUser: boolean;
}

export const UserResultItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
    const user = props as TUser;
    const translate = useTranslations("general");
    const tErrors = useTranslations("errors");
    const { mutateAsync: createFriendRequest } = useCreateFriendRequest();
    const { mutateAsync: updateFriendRequest } = useUpdateFriendRequest();

    const preventFollow = useMemo(() => {
        return user.isLoggedInUser
    }, [user.isLoggedInUser]);

    const canSendFriendRequest = useMemo(() => {
        return !user.isPendingFriendRequest;
    }, [user.isPendingFriendRequest]);

    const isFriend = useMemo(() => {
        return user.isFriend;
    }, [user.isFriend]);

    const isPendingFriendRequest = useMemo(() => {
        return user.isPendingFriendRequest;
    }, [user.isPendingFriendRequest]);

    const canWithdrawnRequest = useMemo(() => {
        return Boolean(user.friendRequestId);
    }, [user.friendRequestId]);

    const canReSendFollowRequest = useMemo(() => {
        return !user.isPendingFriendRequest && !isFriend && Boolean(user.friendRequestId)
    }, [user.isPendingFriendRequest, user.isFriend, user.friendRequestId]);

    const onFollow = async () => {
        try {
            const response = await createFriendRequest({
                receiver: user._id,
            });

            if (response?.status === 401) {
                toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
            } else {
                toast({
                    title: translate('requestSent'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    const onUpdateFriendRequest = async (status: FRIEND_REQUEST_STATUS_TYPE) => {
        try {
            const response = await updateFriendRequest({
                _id: user.friendRequestId,
                status
            });

            if (response?.status === 401) {
                toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
            } else {
                toast({
                    title: status === 'WITHDRAWN' ? translate('requestWithdrawn') : translate('requestSent'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    const onButtonClick = () => {
        if (canReSendFollowRequest) {
            onUpdateFriendRequest('PENDING');

            return;
        }
        if (canWithdrawnRequest) {
            onUpdateFriendRequest('WITHDRAWN');

            return;
        } else {
            onFollow();
        }
    }


    const AuthenticatedButton = () => <>
        {
            !preventFollow &&
            <Button
                onClick={onButtonClick}
                className='rounded-full' size="sm" variant="outline">
                {canSendFriendRequest && translate("follow")}
                {isFriend && translate("unFollow")}
                {isPendingFriendRequest && translate("requestSent")}
            </Button>
        }</>

    const DefaultButton = () => <Button
        className='rounded-full' size="sm" variant="outline">
        {translate("follow")}
    </Button>

    const SensitiveButton = withAuthFallback({
        Component: AuthenticatedButton,
        Fallback: DefaultButton
    });

    return (
        <div ref={ref} className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row gap-2'>
                <ProfilePhoto className='h-6 w-6' user={user} />
                <div>
                    <p className='font-semibold'>{user.userName}</p>
                    <p className='capitalize text-gray-500 text-xs'>{user.displayName}</p>
                </div>
            </div>

            <SensitiveButton />
        </div>
    );
});


UserResultItem.displayName = 'UserResultItem';

export default UserResultItem