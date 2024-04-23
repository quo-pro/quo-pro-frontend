import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useLogin, useSignUp } from '@app/resources/auth/mutation';
import { toast } from '@components/ui/use-toast';
import NAVIGATION from '@app/navigations/navigation';
import { TCredentials } from '@app/resources/auth/types';
import { useLocalStorage } from '@utils/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { Separator } from '@components/ui/separator';
import { ProfilePhoto } from '@components/general/ProfilePhoto';
import { Loader, Loader2 } from 'lucide-react';

type TSchema = Pick<TCredentials, 'userName'>;

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { setValue, getValue } = useLocalStorage();
  const translate = useTranslations("general");
  const tErrors = useTranslations('errors');
  const { push } = useRouter();
  const { mutateAsync: signUp, isLoading: signUpIsLoading } = useSignUp();
  const { mutateAsync: login, isLoading: loginIsLoading } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<TSchema>();

  const unauthenticatedLocalUser = useMemo(() => {
    return {
      userName: getValue("storageUserName"),
      UUID: getValue("storageUUID"),
    } as TCredentials;
  }, [localStorage]);

  const unauthenticatedLocalUserExist = useMemo(() => {
    return unauthenticatedLocalUser.UUID && unauthenticatedLocalUser.userName
  }, [unauthenticatedLocalUser]);

  const onSubmit = async (data: TSchema) => {
    try {
      const UUID = uuidv4();
      const response = await signUp({
        ...data,
        UUID
      });

      if (response?.status === 401) {
        toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
      } else if (response?.status === 409) {
        toast({ title: tErrors('invalidUserName'), className: 'bg-white', duration: 2000 });
      } else {
        setValue('storageUUID', UUID);
        setValue('storageUserName', data.userName);
        await onLogin({ ...data, UUID });
      }
    } catch (error) {
      toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
    }
  };

  const onLogin = async (data: TCredentials) => {
    try {
      const loginResponse = await login({
        ...data,
      });

      if (loginResponse?.status === 401) {
        toast({
          title: tErrors('genericError'),
          className: 'bg-white',
          duration: 2000,
        });
      } else {
        toast({
          title: translate('welcomeToQuo'),
          duration: 1000,
        });

        push(NAVIGATION.FEEDS);
      }
    } catch (error) {
      toast({
        title: tErrors('genericError'),
        className: 'bg-white',
        duration: 2000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>{children}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl flex flex-col gap-8">

        {unauthenticatedLocalUserExist &&
          <div className='flex flex-col gap-4 mt-4'>
            <Button onClick={() => onLogin(unauthenticatedLocalUser)} className='rounded-full flex flex-row gap-4 min-h-12' variant="ghost">
              <ProfilePhoto />
              <div className='rounded-full flex flex-row gap-2 flex-grow'>
                <span> {translate("continueAs")}</span> <span className='font-bold'> {unauthenticatedLocalUser.userName}</span>
              </div>
            </Button>
            <Separator />
          </div>
        }

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{translate("welcomeToQuo")}</DialogTitle>
            <DialogDescription>{translate("quoDialogMessage")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="username" className="block mb-2">
              {translate("usernameLabel")}
            </Label>
            <Input
              id="username"
              placeholder={translate("usernamePlaceholder")}
              className="w-full min-h-16 rounded-xl text-md"
              {...register("userName", { required: tErrors("requiredField"), })}
            />
            {errors.userName && <span className='text-xs  text-red-500'>{tErrors('requiredField')}</span>}
          </div>


          <DialogFooter>
            <Button type="submit" disabled={signUpIsLoading || loginIsLoading}>
              {(signUpIsLoading || loginIsLoading) && <Loader className='animate-spin mr-1' />} {translate("submitButton")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Authenticate;
