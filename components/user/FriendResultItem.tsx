import React, { forwardRef, useMemo } from 'react';
import { IUser } from '@quo-pro/commons';
import { useTranslations } from 'next-intl';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Button } from '@components/ui/button';
import { useUnFriendUser, useUnblockUser } from '@app/resources/user/mutation';
import { Separator } from '@components/ui/separator';
import { toast } from '@components/ui/use-toast';
import Link from 'next/link';
import NAVIGATION from '@app/navigations/navigation';

interface ItemProps extends IUser {
    isLast: boolean
}
type TUser = IUser & {
    isFollower: boolean;
    isFollowing: boolean;
    isBlocked: string;
}
const FriendResultItem = forwardRef<HTMLDivElement, ItemProps>(({ isLast, ...props }, ref) => {
    const user = props as TUser;
    const translate = useTranslations("general");
    const tErrors = useTranslations("errors");
    const { mutateAsync: unblockUser } = useUnblockUser();
    const { mutateAsync: unfriendUser } = useUnFriendUser();

    const onUnblockUser = async () => {
        try {
            const response = await unblockUser(props._id);

            if (response?.status === 401) {
                toast({
                    title: tErrors('error'),
                    description: tErrors('genericError'),
                    className: 'bg-white',
                    duration: 2000
                });
            } else {
                toast({
                    title: translate('unblocked'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({
                title: tErrors('genericError'),
                className: 'bg-white',
                duration: 2000
            });
        }
    };

    const onUnfriendUser = async () => {
        try {
            const response = await unfriendUser(user._id);

            if (response?.status === 401) {
                toast({
                    title: tErrors('error'),
                    description: tErrors('genericError'),
                    className: 'bg-white', duration: 2000
                });
            } else {
                toast({
                    title: translate('unfollowed'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({
                title: tErrors('genericError'),
                className: 'bg-white',
                duration: 2000
            });
        }
    };

    const onButtonClick = async (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        if (user.isBlocked) {
            await onUnblockUser();
            return;
        }

        if (user.isFollowing) {
            await onUnfriendUser();
            return;
        }
    }

    const buttonTranslation = useMemo(() => {
        if (user.isBlocked) {
            return translate("blocked")
        }

        if (user.isFollower && user.isFollowing) {
            return translate("following")
        }

        if (user.isFollower) {
            return translate("followsYou")
        }

        if (user.isFollowing) {
            return translate("following")
        }
    }, [user.isFollower, user.isFollowing])

    return (
        <>
            <Link href={`${NAVIGATION.PROFILE}/${props.userName}`}>
                <div ref={ref} className='flex flex-row items-center justify-between w-full'>
                    <div className='flex flex-row gap-2'>
                        <ProfilePhoto className='h-6 w-6' user={props} />
                        <div>
                            <p className='font-semibold'>{props.userName}</p>
                            <p className='capitalize text-gray-500 text-xs'>{props.displayName}</p>
                        </div>
                    </div>

                    <Button
                        onClick={onButtonClick}
                        className='rounded-full' size="sm" variant="outline">
                        {buttonTranslation}
                    </Button>
                </div>
            </Link>

            {!isLast && <Separator />}
        </>
    );
});

FriendResultItem.displayName = 'FriendResultItem';

export default FriendResultItem
