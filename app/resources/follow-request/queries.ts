import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, IFriendRequest } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TFriendRequestQuery } from './types';

export const friendRequestQueryKeys = {
  all: [{ scope: 'friendRequests' }] as const,
  friendRequest: (friendRequestId: string) =>
    [
      {
        ...friendRequestQueryKeys.all[0],
        entity: 'single friendRequest',
        friendRequestId,
      },
    ] as const,
  friendRequests: (query: TFriendRequestQuery) =>
    [
      {
        ...friendRequestQueryKeys.all[0],
        entity: 'friendRequest list',
        ...query,
      },
    ] as const,
};

async function fetchFriend({
  queryKey: [{ friendRequestId }],
}: QueryFunctionContext<ReturnType<(typeof friendRequestQueryKeys)['friendRequest']>>) {
  if (!friendRequestId) {
    return null;
  }
  const res = await apiHttp.get<IFriendRequest>(apiRoutes.friendRequests + friendRequestId);
  return res.data;
}

async function fetchFriends({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof friendRequestQueryKeys)['friendRequests']>>): Promise<
  IQueryResponse<IFriendRequest>
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

  const response = await apiHttp.get<IQueryResponse<IFriendRequest>>(apiRoutes.friendRequests, {
    params,
  });

  return response.data;
}

export const useGetFriend = <SelectReturnType = IFriendRequest, ErrorType = unknown>(
  { friendRequestId }: { friendRequestId: string },
  options?: UseQueryOptions<
    IFriendRequest | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof friendRequestQueryKeys)['friendRequest']>
  >
) => {
  return useQuery<
    IFriendRequest | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof friendRequestQueryKeys)['friendRequest']>
  >(friendRequestQueryKeys.friendRequest(friendRequestId), fetchFriend, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetFriends = <
  SelectData = IQueryResponse<IFriendRequest>,
  Error = unknown
>(
  query: TFriendRequestQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IFriendRequest>,
    Error,
    SelectData,
    IQueryResponse<IFriendRequest>,
    ReturnType<(typeof friendRequestQueryKeys)['friendRequests']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IFriendRequest>,
    Error,
    SelectData,
    ReturnType<(typeof friendRequestQueryKeys)['friendRequests']>
  >(friendRequestQueryKeys.friendRequests(query), fetchFriends, {
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
