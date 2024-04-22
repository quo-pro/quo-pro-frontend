import { useMutation } from 'react-query';
import { TCredentials } from './types';
import { queryClient } from '@lib/queryConfig';
import { authQueryKeys } from './queries';
import { signIn } from 'next-auth/react';
import NAVIGATION from '@app/navigations/navigation';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IUser } from '@quo-pro/commons';
import { userQueryKeys } from '../user/queries';

async function login(credentials: TCredentials) {
  return signIn('credentials', {
    ...credentials,
    redirect: false,
    callbackUrl: NAVIGATION.FEEDS,
  });
}

async function signUp(payload: TCredentials) {
  return apiHttp.post<IUser>(apiRoutes.register, payload);
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};