"use client";
import withClientAuth from '@app/HOFs/client/withClientAuth'
import { useGetLoggedInUser } from '@app/resources/user/queries';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useTranslations } from 'next-intl';
import { useUpdateUser } from '@app/resources/user/mutation';

const Profile = () => {
  const translate = useTranslations("general");
  const tErrors = useTranslations("errors");

  const { data: user } = useGetLoggedInUser();
  const { mutateAsync: updateUser } = useUpdateUser()

  const FormSchema = z.object({
    statusMessage: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 30 characters.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async ({ statusMessage }: z.infer<typeof FormSchema>) => {
    try {
      const response = await updateUser({ id: user?._id as string, payload: { statusMessage } });

      if (response?.status === 401) {
        toast({
          title: tErrors('error'),
          description: tErrors('genericError'),
          className: 'bg-white', duration: 2000
        });
      } else {
        toast({
          title: translate('statusUpdated'),
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
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className='flex flex-col justify-center items-center p-4'>
        <ProfilePhoto user={user} className='h-8 w-8' />
        <p className='capitalize text-sm mt-2'>{user?.displayName}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="statusMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("bio")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={translate("shareSomethingWithTheWorld")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {translate("youCanMentionOthers")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{translate("update")}</Button>
        </form>
      </Form>
    </div>
  )
}

export default withClientAuth(Profile)