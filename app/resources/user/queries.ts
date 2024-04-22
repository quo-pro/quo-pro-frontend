import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, IUser } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TUserQuery } from './types';

export const userQueryKeys = {
  all: [{ scope: 'users' }] as const,
  user: (userName: string) =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'single user',
        userName,
      },
    ] as const,
  me: () =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'authenticated user',
      },
    ] as const,
  users: (query: TUserQuery) =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'user list',
        ...query,
      },
    ] as const,
  friends: (query: TUserQuery) =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'friend list',
        ...query,
      },
    ] as const,
  publicUsers: (query: TUserQuery) =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'public user list',
        ...query,
      },
    ] as const,
};

async function fetchLoggedInUser() {
  const res = await apiHttp.get<IUser>('users/me');
  return res.data;
}

async function fetchUser({
  queryKey: [{ userName }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['user']>>) {
  if (!userName) {
    return null;
  }
  const res = await apiHttp.get<IUser>(`${apiRoutes.publicUsers}/${userName}`);
  return res.data;
}

async function fetchUsers({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['users']>>): Promise<
  IQueryResponse<IUser>
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

  const response = await apiHttp.get<IQueryResponse<IUser>>(apiRoutes.users, {
    params,
  });

  return response.data;
}

async function fetchPublicUsers({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['publicUsers']>>): Promise<
  IQueryResponse<IUser>
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

  const response = await apiHttp.get<IQueryResponse<IUser>>(apiRoutes.publicUsers, {
    params,
  });

  return response.data;
}

async function fetchFriends({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['friends']>>): Promise<
  IQueryResponse<IUser>
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

  const response = await apiHttp.get<IQueryResponse<IUser>>(apiRoutes.friends, {
    params,
  });

  return response.data;
}

export const useGetUser = <SelectReturnType = IUser, ErrorType = unknown>(
  { userName }: { userName: string },
  options?: UseQueryOptions<
    IUser | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['user']>
  >
) => {
  return useQuery<
    IUser | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['user']>
  >(userQueryKeys.user(userName), fetchUser, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetLoggedInUser = <
  SelectReturnType = IUser,
  ErrorType = unknown
>(
  options?: UseQueryOptions<
    IUser | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['me']>
  >
) => {
  return useQuery<
    IUser | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['me']>
  >(userQueryKeys.me(), fetchLoggedInUser, {
    staleTime: DURATIONS.fifteenMins,
    suspense: true,
    ...options,
  });
};

export const useGetUsers = <
  SelectData = IQueryResponse<IUser>,
  Error = unknown
>(
  query: TUserQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    IQueryResponse<IUser>,
    ReturnType<(typeof userQueryKeys)['users']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    ReturnType<(typeof userQueryKeys)['users']>
  >(userQueryKeys.users(query), fetchUsers, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.thirtyMins,
    refetchInterval: DURATIONS.thirtyMins,
    suspense: true,
    ...options,
  });
};

export const useGetPublicUsers = <
  SelectData = IQueryResponse<IUser>,
  Error = unknown
>(
  query: TUserQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    IQueryResponse<IUser>,
    ReturnType<(typeof userQueryKeys)['publicUsers']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    ReturnType<(typeof userQueryKeys)['publicUsers']>
  >(userQueryKeys.publicUsers(query), fetchPublicUsers, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.thirtyMins,
    refetchInterval: DURATIONS.thirtyMins,
    suspense: true,
    ...options,
  });
};

export const useGetFriends = <
  SelectData = IQueryResponse<IUser>,
  Error = unknown
>(
  query: TUserQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    IQueryResponse<IUser>,
    ReturnType<(typeof userQueryKeys)['friends']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IUser>,
    Error,
    SelectData,
    ReturnType<(typeof userQueryKeys)['friends']>
  >(userQueryKeys.friends(query), fetchFriends, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.thirtyMins,
    refetchInterval: DURATIONS.thirtyMins,
    suspense: true,
    ...options,
  });
};
