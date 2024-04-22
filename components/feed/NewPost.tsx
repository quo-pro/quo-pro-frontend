"use client"
import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';
import { Separator } from '@components/ui/separator';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { SVG } from '@components/svgs/SVG';
import { useGetLoggedInUser } from '@app/resources/user/queries';
import { IUser } from '@quo-pro/commons';
import { MessageBox } from '@components/messageBox/MessageBox';
import { useSession } from 'next-auth/react';

const NewPost = () => {
    const translate = useTranslations("general");
    const { data: loggedInUserData } = useGetLoggedInUser();

    const loggedInUser = useMemo(() => {
        return loggedInUserData as IUser
    }, [loggedInUserData])

    return (
        <Dialog>
            <DialogTrigger asChild >
                <div className='flex flex-col gap-4 cursor-text'>
                    <div className='flex flex-row items-center justify-between h-full'>
                        <div className='flex flex-row items-center gap-4'>
                            <ProfilePhoto />
                            <span className='text-sm'> {translate("whatsYourVerse")}</span>
                        </div>

                        <Button className='rounded-full' size="sm">
                            {translate("post")}
                        </Button>
                    </div>
                    <Separator />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full h-full md:h-auto md:rounded-2xl flex flex-col gap-8" closeButtonStyle=''>
                <DialogHeader className='md:hidden'>
                    <DialogTitle>{translate("newQuo")}</DialogTitle>
                </DialogHeader>
                <div className='flex flex-row gap-4 h-full w-full'>
                    <div className='flex flex-col justify-start items-center h-full'>
                        <SVG.logo className='h-8 w-8' />
                        <Separator orientation="vertical" className='min-h-14 max-h-14' />
                        <ProfilePhoto className='h-3 w-3' />
                    </div>
                    <div className="w-full h-full">
                        <p className='font-bold text-sm'>{loggedInUser?.displayName}</p>
                        <MessageBox />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NewPost;
