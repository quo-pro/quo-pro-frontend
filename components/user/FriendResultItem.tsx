import React, { forwardRef } from 'react';
import { IUser } from '@quo-pro/commons';
import { useTranslations } from 'next-intl';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Button } from '@components/ui/button';
import { useBlockUser, useUnFriendUser } from '@app/resources/user/mutation';
import { Separator } from '@components/ui/separator';
import { isUtf8 } from 'buffer';
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
    const { mutateAsync: blockUser } = useBlockUser();
    const { mutateAsync: unfriendUser } = useUnFriendUser();


    // const onBlockUser = async () => {
    //     try {
    //         const response = await blockUser(props.);

    //         if (response?.status === 401) {
    //             toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
    //         } else {
    //             toast({
    //                 title: props.status === 'BLOCKED' ? translate('unblocked') : translate('blocked'),
    //                 duration: 1000,
    //             });
    //         }
    //     } catch (error) {
    //         toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
    //     }
    // };

    const onUnfollow = async () => {
        if (!user.isFollowing) {
            return
        }

        try {
            const response = await unfriendUser(user._id);

            if (response?.status === 401) {
                toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
            } else {
                toast({
                    title: translate('unfollowed'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    }

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
                        onClick={onUnfollow}
                        className='rounded-full' size="sm" variant="outline">
                        {user.isBlocked && translate("blocked")}
                        {user.isFollower && translate("followsYou")}
                        {user.isFollowing && translate("following")}
                    </Button>
                </div>
            </Link>

            {!isLast && <Separator />}
        </>
    );
});

export default FriendResultItem
