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
import { QuoPostViewer } from './QuoPostViewer';

interface ItemProps extends IPost {
    isLast: boolean;
}
const FeedItemWithQuoViewer = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
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
            <div className='flex flex-row items-baseline justify-between'>
                <div className='flex flex-row gap-4'>
                    <Link href={`/${NAVIGATION.PROFILE}/${props.user.userName}`}>
                        <ProfilePhoto user={props.user} />
                    </Link>
                    <div>
                        <div className='flex flex-row items-center gap-2'>
                            <span className='font-semibold text-sm'>{props.user.userName}</span>
                            <span className='text-sm text-gray-400'>{timeAgoShort(props.createdAt)}</span>
                        </div>
                        <p className='font-light text-sm leading-tight line-clamp-2' style={{ fontSize: '.8rem' }}>{props.user.statusMessage}</p>
                    </div>
                </div>

                {
                    session?.status === 'authenticated' &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className='w-4 h-4'>
                                <Ellipsis className='text-gray-300' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={onFlagContent}>
                                <p className='text-red-800'> {translate("flagAsInappropriate")}</p>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>

            <div className='flex flex-col gap-1 h-full'>
                <QuoPostViewer initialValue={props.editorContent} />
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

            {!props.isLast && <Separator />}
        </>
    );
});

FeedItemWithQuoViewer.displayName = 'FeedItemWithQuoViewer';

export default FeedItemWithQuoViewer