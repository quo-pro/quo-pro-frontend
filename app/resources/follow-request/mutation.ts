import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertFriendRequest } from './types';
import { friendRequestQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IFriendRequest } from '@quo-pro/commons';
import { userQueryKeys } from '../user/queries';
import { notificationQueryKeys } from '../notifications/queries';

async function createFriendRequest(payload: Omit<TUpsertFriendRequest, 'status'>) {
  return apiHttp.post<IFriendRequest>(`${apiRoutes.friendRequests}`, payload);
}

async function updateFriendRequest({ _id, ...rest }: Omit<TUpsertFriendRequest, 'receiver'> & { _id: string }) {
  return apiHttp.patch<IFriendRequest>(`${apiRoutes.friendRequests}/${_id}`, rest);
}

export const useUpdateFriendRequest = () => {
  return useMutation({
    mutationFn: updateFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: friendRequestQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
};

export const useCreateFriendRequest = () => {
  return useMutation({
    mutationFn: createFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: friendRequestQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
};
