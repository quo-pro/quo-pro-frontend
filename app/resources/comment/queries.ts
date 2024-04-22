import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, IComment } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TCommentQuery } from './types';

export const commentQueryKeys = {
  all: [{ scope: 'comments' }] as const,
  comment: (commentId: string) =>
    [
      {
        ...commentQueryKeys.all[0],
        entity: 'single comment',
        commentId,
      },
    ] as const,
  comments: (query: TCommentQuery) =>
    [
      {
        ...commentQueryKeys.all[0],
        entity: 'comment list',
        ...query,
      },
    ] as const,
};

async function fetchComment({
  queryKey: [{ commentId }],
}: QueryFunctionContext<ReturnType<(typeof commentQueryKeys)['comment']>>) {
  if (!commentId) {
    return null;
  }
  const res = await apiHttp.get<IComment>(apiRoutes.comments + commentId);
  return res.data;
}

async function fetchComments({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof commentQueryKeys)['comments']>>): Promise<
  IQueryResponse<IComment>
> {
  const params: Record<string, any> = {
    sort_by,
    page: pageParam,
    search_value,
    limit,
    startDate,
    endDate,
    status,
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const response = await apiHttp.get<IQueryResponse<IComment>>(apiRoutes.comments, {
    params,
  });

  return response.data;
}

export const useGetComment = <SelectReturnType = IComment, ErrorType = unknown>(
  { commentId }: { commentId: string },
  options?: UseQueryOptions<
    IComment | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof commentQueryKeys)['comment']>
  >
) => {
  return useQuery<
    IComment | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof commentQueryKeys)['comment']>
  >(commentQueryKeys.comment(commentId), fetchComment, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetComments = <
  SelectData = IQueryResponse<IComment>,
  Error = unknown
>(
  query: TCommentQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IComment>,
    Error,
    SelectData,
    IQueryResponse<IComment>,
    ReturnType<(typeof commentQueryKeys)['comments']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IComment>,
    Error,
    SelectData,
    ReturnType<(typeof commentQueryKeys)['comments']>
  >(commentQueryKeys.comments(query), fetchComments, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.tenSeconds,
    refetchInterval: DURATIONS.oneMinute,
    suspense: true,
    ...options,
  });
};
