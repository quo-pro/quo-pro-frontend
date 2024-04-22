import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertUser } from './types';
import { userQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IUser } from '@quo-pro/commons';

async function updateUser({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TUpsertUser>;
}) {
  return apiHttp.patch<IUser>(`${apiRoutes.users}/${id}`, payload);
}

async function blockUser(userToBlock: string) {
  return apiHttp.post<IUser>(`${apiRoutes.users}/${userToBlock}/block`);
}

async function unfriendUser(friendId: string) {
  return apiHttp.delete<IUser>(`${apiRoutes.friends}/${friendId}`);
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useBlockUser = () => {
  return useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useUnFriendUser = () => {
  return useMutation({
    mutationFn: unfriendUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};
