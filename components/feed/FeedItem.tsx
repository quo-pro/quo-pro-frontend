import NAVIGATION from '@app/navigations/navigation';
import { useCreateFlaggedContent } from '@app/resources/flagged-content/mutation';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Button } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { Separator } from '@components/ui/separator';
import { toast } from '@components/ui/use-toast';
import { timeAgoShort } from '@lib/utils';
import { IPost } from '@quo-pro/commons'
import { Ellipsis, Heart, MessageCircle, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { forwardRef } from 'react'

interface ItemProps extends IPost {
    isLast: boolean;
}
const FeedItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
    const session = useSession()
    const translate = useTranslations("general");
    const tErrors = useTranslations("errors");
    const { mutateAsync: flagContent } = useCreateFlaggedContent()

    const onFlagContent = async () => {
        try {
            const response = await flagContent({ post: props._id, reason: 'INAPPROPRIATE' });

            if (response?.status === 401) {
                toast({
                    title: tErrors('error'),
                    description: tErrors('genericError'),
                    className: 'bg-white', duration: 2000
                });
            } else {
                toast({
                    title: translate('reported'),
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

    return (
        <>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-4'>
                    <Link href={`/${NAVIGATION.PROFILE}/${props.user.userName}`}>
                        <ProfilePhoto user={props.user} />
                    </Link>
                    <div>
                        <div className='flex flex-row items-center gap-2'>
                            <span className='font-semibold text-sm'>{props.user.userName}</span>
                            <span className='text-sm text-gray-400'>{timeAgoShort(props.createdAt)}</span>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm'>{props.content}</p>
                            <div className='flex flex-row -ml-2'>
                                <Button size="icon" variant="ghost" className='rounded-full'>
                                    <Heart className='h-4 w-4' />
                                </Button>
                                <Button size="icon" variant="ghost" className='rounded-full'>
                                    <MessageCircle className='h-4 w-4' />
                                </Button>
                                <Button size="icon" variant="ghost" className='rounded-full '>
                                    <Send className='h-4 w-4' />
                                </Button>
                            </div>
                            <p className='text-xs text-gray-400'>
                                {props.likeCount > 0 && <span>{translate("likes")} {props.likeCount}</span>}
                                {props.commentCount > 0 && <span className='mx-2'>&#183;</span>}
                                {props.commentCount > 0 && <span>{translate("comments")} {props.commentCount}</span>}
                            </p>
                        </div>
                    </div>
                </div>
                {
                    session?.status === 'authenticated' &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Ellipsis className='text-gray-300 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem onClick={onFlagContent}>
                                <p className='text-red-800'> {translate("flagAsInappropriate")}</p>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>}
            </div>

            {!props.isLast && <Separator />}
        </>
    );
});

FeedItem.displayName = 'FeedItem';

export default FeedItem