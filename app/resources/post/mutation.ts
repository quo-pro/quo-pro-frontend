import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertPost } from './types';
import { postQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IPost } from '@quo-pro/commons';

async function createPost(payload: Omit<TUpsertPost, '_id'>) {
  return apiHttp.post<IPost>(apiRoutes.posts, payload);
}

async function updatePost({ _id, ...payload }: TUpsertPost & { _id: string }) {
  return apiHttp.patch<IPost>(`${apiRoutes.posts}/${_id}`, payload);
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
    },
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
    },
  });
};
