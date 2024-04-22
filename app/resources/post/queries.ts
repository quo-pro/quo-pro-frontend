import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, IPost } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TPostQuery } from './types';

export const postQueryKeys = {
  all: [{ scope: 'posts' }] as const,
  post: (postId: string) =>
    [
      {
        ...postQueryKeys.all[0],
        entity: 'single post',
        postId,
      },
    ] as const,
  posts: (query: TPostQuery) =>
    [
      {
        ...postQueryKeys.all[0],
        entity: 'post list',
        ...query,
      },
    ] as const,
  publicPosts: (query: TPostQuery) =>
    [
      {
        ...postQueryKeys.all[0],
        entity: 'public post list',
        ...query,
      },
    ] as const,
};

async function fetchPost({
  queryKey: [{ postId }],
}: QueryFunctionContext<ReturnType<(typeof postQueryKeys)['post']>>) {
  if (!postId) {
    return null;
  }
  const res = await apiHttp.get<IPost>('posts/' + postId);
  return res.data;
}

async function fetchPosts({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status, visibility }],
}: QueryFunctionContext<ReturnType<(typeof postQueryKeys)['posts']>>): Promise<
  IQueryResponse<IPost>
> {
  const params: Record<string, any> = {
    sort_by,
    page: pageParam,
    search_value,
    limit,
    startDate,
    endDate,
    status,
    visibility
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const response = await apiHttp.get<IQueryResponse<IPost>>(apiRoutes.posts, {
    params,
  });

  return response.data;
}

async function fetchPublicPosts({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status, user }],
}: QueryFunctionContext<ReturnType<(typeof postQueryKeys)['publicPosts']>>): Promise<
  IQueryResponse<IPost>
> {
  const params: Record<string, any> = {
    sort_by,
    page: pageParam,
    search_value,
    limit,
    startDate,
    endDate,
    status,
    user
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const response = await apiHttp.get<IQueryResponse<IPost>>(apiRoutes.publicPosts, {
    params,
  });

  return response.data;
}

export const useGetPost = <SelectReturnType = IPost, ErrorType = unknown>(
  { postId }: { postId: string },
  options?: UseQueryOptions<
    IPost | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof postQueryKeys)['post']>
  >
) => {
  return useQuery<
    IPost | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof postQueryKeys)['post']>
  >(postQueryKeys.post(postId), fetchPost, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetPosts = <
  SelectData = IQueryResponse<IPost>,
  Error = unknown
>(
  query: TPostQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IPost>,
    Error,
    SelectData,
    IQueryResponse<IPost>,
    ReturnType<(typeof postQueryKeys)['posts']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IPost>,
    Error,
    SelectData,
    ReturnType<(typeof postQueryKeys)['posts']>
  >(postQueryKeys.posts(query), fetchPosts, {
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

export const useGetPublicPosts = <
  SelectData = IQueryResponse<IPost>,
  Error = unknown
>(
  query: TPostQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IPost>,
    Error,
    SelectData,
    IQueryResponse<IPost>,
    ReturnType<(typeof postQueryKeys)['publicPosts']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IPost>,
    Error,
    SelectData,
    ReturnType<(typeof postQueryKeys)['publicPosts']>
  >(postQueryKeys.publicPosts(query), fetchPublicPosts, {
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
