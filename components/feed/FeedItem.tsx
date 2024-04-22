import NAVIGATION from '@app/navigations/navigation';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { timeAgoShort } from '@lib/utils';
import { IPost } from '@quo-pro/commons'
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { forwardRef } from 'react'

interface ItemProps extends IPost {
    isLast: boolean;
}
const FeedItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
    const translate = useTranslations("general");

    return (
        <>
            <div>
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
            </div>

            {!props.isLast && <Separator />}
        </>
    );
});

export default FeedItem