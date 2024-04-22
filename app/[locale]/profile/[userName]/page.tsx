'use client';
import { useGetUser } from '@app/resources/user/queries';
import PublicFeedList from '@components/feed/PublicFeedList';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Separator } from '@components/ui/separator';
import { useTranslations } from 'next-intl';

export default function SingleUser({
    params: { userName },
}: {
    params: { userName: string };
}) {

    const { data: profileData, isLoading: profileIsLoading, isError } = useGetUser(
        {
            userName
        },
        { enabled: Boolean(userName) }
    );

    const translate = useTranslations('general');

    if (profileIsLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profileData) {
        return <div>404 Not found</div>;
    }

    return (
        <div className="flex flex-col max-w-lg justify-center mx-auto w-full relative gap-4">
            <div className='flex flex-row items-center w-full justify-between'>
                <div>
                    <p className='text-lg capitalize'>{profileData.displayName}</p>
                    <p className='font-light text-sm'>{profileData.userName}</p>
                </div>
                <ProfilePhoto user={profileData} className='h-20 w-20 border-2 ' />
            </div>

            <p>{profileData.statusMessage}</p>

            <Separator />
            <p>{translate("posts")}</p>
            {profileData && <PublicFeedList user={profileData._id} />}
        </div>
    );
}
