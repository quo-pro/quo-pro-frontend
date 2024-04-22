import { CornerDownLeft, Images, Mic, Globe, GlobeLock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslations } from 'next-intl'
import { useCreatePost } from '@app/resources/post/mutation'
import { TUpsertPost } from '@app/resources/post/types'
import { toast } from '@components/ui/use-toast'
import { Controller, useForm } from 'react-hook-form'
import { DialogClose, DialogFooter } from '@components/ui/dialog'
import { useMemo, useState } from 'react'
import { Toggle } from "@/components/ui/toggle"
import { POST_VISIBILITY_TYPE } from '@quo-pro/commons'

export const MessageBox = () => {
    const translate = useTranslations("general");
    const tErrors = useTranslations('errors');
    const { reset, control, handleSubmit, formState: { errors }, watch } = useForm<TUpsertPost>();
    const { mutateAsync: createPost } = useCreatePost();
    const [visibility, setVisibility] = useState<POST_VISIBILITY_TYPE>('PUBLIC');
    const content = watch("content");

    const onSubmit = async (data: TUpsertPost) => {
        try {
            const response = await createPost({ ...data, visibility });

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
                reset();
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    const willDisableSubmitButton = useMemo(() => {
        return errors.content || !content || content.trim() === '';
    }, [errors.content, content]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="focus-within:ring-0 h-full"
        >
            <div className='flex flex-col gap-2'>
                <Controller
                    control={control}
                    name="content"
                    rules={{ required: tErrors("requiredField") }}
                    render={({ field }) => (
                        <div
                            contentEditable
                            onInput={e => field.onChange(e.currentTarget.textContent)}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            className='text-sm focus-visible:ring-0 outline-none mr-10'
                            role="textbox"
                            aria-label={translate("whatsYourVerse")}
                        />
                    )}
                />

                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Images className="size-4" />
                            <span className="sr-only">{translate("attachMedia")}</span>
                        </TooltipTrigger>
                        <TooltipContent side="top">{translate("attachMedia")}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Mic className="size-4" />
                            <span className="sr-only">{translate("useMicrophone")}</span>
                        </TooltipTrigger>
                        <TooltipContent side="top">{translate("useMicrophone")}</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <DialogFooter className="fixed bottom-0 right-0 mb-6 mr-6 flex flex-row gap-4">
                <Toggle aria-label="Toggle visibility" type="button" onPressedChange={(pressed) => setVisibility(pressed ? 'FRIENDS' : 'PUBLIC')}>
                    {
                        visibility === 'PUBLIC' &&
                        <Tooltip delayDuration={200} >
                            <TooltipTrigger type="button"><Globe className="h-4 w-4" /></TooltipTrigger>
                            <TooltipContent>
                                <p>{translate("shareWithPublic")}</p>
                            </TooltipContent>
                        </Tooltip>
                    }
                    {
                        visibility === 'FRIENDS' &&
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger type="button"><GlobeLock className="h-4 w-4" /></TooltipTrigger>
                            <TooltipContent>
                                <p>{translate("shareWithFriendsOnly")}</p>
                            </TooltipContent>
                        </Tooltip>
                    }
                </Toggle>
                <DialogClose asChild>
                    <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={willDisableSubmitButton}>
                        {translate("post")}
                        <CornerDownLeft className="size-3.5" />
                    </Button>

                </DialogClose>
            </DialogFooter>
        </form>
    )
}
