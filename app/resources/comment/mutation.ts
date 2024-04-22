import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertComment } from './types';
import { commentQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IComment } from '@quo-pro/commons';

async function createComment(payload: TUpsertComment) {
  return apiHttp.post<IComment>(apiRoutes.comments, payload);
}

async function updateComment({ _id, ...payload }: TUpsertComment & { _id: string }) {
  return apiHttp.patch<IComment>(`${apiRoutes.comments}/${_id}`, payload);
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.all,
      });
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.all,
      });
    },
  });
};
