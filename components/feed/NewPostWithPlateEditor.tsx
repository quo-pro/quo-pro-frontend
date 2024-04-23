"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';
import { Separator } from '@components/ui/separator';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { useGetLoggedInUser } from '@app/resources/user/queries';
import { Loader } from 'lucide-react';
import { QuoEditor } from './QuoEditor';
import { useCreatePost } from '@app/resources/post/mutation';
import { POST_VISIBILITY_TYPE } from '@quo-pro/commons';
import { toast } from '@components/ui/use-toast';

const NewPostWithPlateEditor = () => {
    const tErrors = useTranslations('errors');
    const translate = useTranslations("general");
    const { isLoading } = useGetLoggedInUser();
    const [content] = useState([
        {
            id: '1',
            type: 'span',
            children: [{ text: translate("editorPlaceholder") }],
        },
    ]);
    const { mutateAsync: createPost, isLoading: createPostIsProgress } = useCreatePost();

    const handleSave = async (editorContent: any[], visibility: POST_VISIBILITY_TYPE) => {
        try {
            const response = await createPost({ editorContent, visibility });

            if (response?.status === 401) {
                toast({
                    title: tErrors('error'),
                    description: tErrors('genericError'),
                    className: 'bg-white', duration: 2000
                });
            } else if (response?.status === 409) {
                toast({
                    title: tErrors('invalidUserName'),
                    className: 'bg-white',
                    duration: 2000
                });
            } else {
                toast({
                    title: translate('successful'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex flex-col gap-4 cursor-text'>
                    <div className='flex flex-row items-center justify-between h-full'>
                        <div className='flex flex-row items-center gap-4'>
                            <ProfilePhoto />
                            <span className='text-sm font-montserrat-alt1'> {translate("whatsYourVerse")}</span>
                        </div>

                        <Button className='rounded-full' size="sm">
                            {isLoading && <Loader className='animate-spin mr-1' />} {translate("post")}
                        </Button>
                    </div>
                    <Separator />
                </div>
            </DialogTrigger>

            <DialogContent className="p-0 w-full h-full md:h-auto max-h-screen md:max-h-[calc(100vh-100px)] flex flex-col gap-8 overflow-hidden overflow-y-auto" closeButtonStyle='hidden'>
                <div className='mt-0 overflow-y-auto thin-scrollbar'>
                    <QuoEditor initialValue={content} onEditDone={handleSave} isLoading={createPostIsProgress} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NewPostWithPlateEditor;
