import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertFlaggedContent } from './types';
import { flaggedContentQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IFlaggedContent } from '@quo-pro/commons';
import { postQueryKeys } from '../post/queries';

async function createFlaggedContent(payload: Omit<TUpsertFlaggedContent, '_id'>) {
    return apiHttp.post<IFlaggedContent>(apiRoutes.flaggedContents, payload);
}

export const useCreateFlaggedContent = () => {
    return useMutation({
        mutationFn: createFlaggedContent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: flaggedContentQueryKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: postQueryKeys.all,
            });
        },
    });
};