import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import withAuthFallback from '@app/HOFs/client/withAuthFallback';
import { useTranslations } from 'next-intl';
import { SVG } from '@components/svgs/SVG';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NAVIGATION from '@app/navigations/navigation';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { useGetLoggedInUser } from '@app/resources/user/queries';

const Trigger = () => (
    <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
    </Button>
)
const ProfileMenu = () => {
    const translate = useTranslations("general");
    const { push } = useRouter();
    const { data } = useGetLoggedInUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span> <ProfilePhoto user={data} /></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className='flex flex-col justify-center items-center p-4'>
                    <Button onClick={() => push(NAVIGATION.PROFILE)} variant="outline" className='rounded-full w-10 h-10'>
                        <ProfilePhoto user={data} className='h-8 w-8' />
                    </Button>
                    <p className='capitalize text-sm mt-2'>{data?.displayName}</p>
                    <p className='text-xs text-gray-400'>{data?.userName}</p>

                </div>
                <DropdownMenuItem
                    onClick={() => push(NAVIGATION.SETTINGS)}
                    className='flex flex-row gap-2 cursor-pointer'>
                    <SVG.settings className='h-4 w-4' />
                    {translate("settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut()}
                    className='flex flex-row gap-2 cursor-pointer'>
                    <SVG.pinLeft className='h-4 w-4' />
                    {translate("logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default withAuthFallback({
    Component: ProfileMenu,
    Fallback: Trigger
});
