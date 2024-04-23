'use client';
import { useBlockUser } from '@app/resources/user/mutation';
import { useGetUser } from '@app/resources/user/queries';
import PublicFeedList from '@components/feed/PublicFeedList';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Separator } from '@components/ui/separator';
import { toast } from '@components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@components/ui/button';
import { Ellipsis } from 'lucide-react';

export default function SingleUser({ params: { userName }, }: { params: { userName: string } }) {
    const { data: profileData, isLoading: profileIsLoading, isError } = useGetUser({ userName }, { enabled: Boolean(userName) });
    const translate = useTranslations('general');
    const { mutateAsync: blockUser } = useBlockUser();
    const tErrors = useTranslations("errors");
    const session = useSession();

    const isCurrentUser = useMemo(() => {
        if (!session.data) return false;
        if (!profileData) return false;
        return session.data?.user.id === profileData?._id
    }, [session.data?.user.id, profileData?._id]);

    if (profileIsLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profileData) {
        return <div>404 Not found</div>;
    }

    const onBlockUser = async () => {
        if (isCurrentUser) {
            return;
        }

        try {
            const response = await blockUser(profileData?._id as string);

            if (response?.status === 401) {
                toast({
                    title: tErrors('error'),
                    description: tErrors('genericError'),
                    className: 'bg-white', duration: 2000
                });
            } else {
                toast({
                    title: translate('blocked'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    return (
        <div className="flex flex-col max-w-lg justify-center mx-auto w-full relative gap-4">
            <div className='flex flex-row items-center w-full justify-between'>
                <div>
                    <p className='text-lg capitalize'>{profileData.displayName}</p>
                    <p className='font-light text-sm'>{profileData.userName}</p>
                </div>
                <ProfilePhoto user={profileData} className='h-20 w-20 border-2 ' />
            </div>

            <p className='text-sm'>{profileData.statusMessage}</p>

            {
                session?.status === 'authenticated' && <div className='flex justify-end'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Ellipsis className='text-gray-400' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem onClick={onBlockUser}>
                                <p className='text-red-800'> {translate("block")}</p>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            }

            <Separator />
            <p className='font-bold'>{translate("posts")}</p>
            {profileData && <PublicFeedList user={profileData._id} />}
        </div>
    );
}
