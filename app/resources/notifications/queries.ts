import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, INotification } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TNotificationQuery } from './types';

export const notificationQueryKeys = {
  all: [{ scope: 'notifications' }] as const,
  notification: (notificationId: string) =>
    [
      {
        ...notificationQueryKeys.all[0],
        entity: 'single notification',
        notificationId,
      },
    ] as const,
  notifications: (query: TNotificationQuery) =>
    [
      {
        ...notificationQueryKeys.all[0],
        entity: 'notification list',
        ...query,
      },
    ] as const,
};

async function fetchNotification({
  queryKey: [{ notificationId }],
}: QueryFunctionContext<ReturnType<(typeof notificationQueryKeys)['notification']>>) {
  if (!notificationId) {
    return null;
  }
  const res = await apiHttp.get<INotification>(`${apiRoutes.notifications}/${notificationId}`);
  return res.data;
}

async function fetchNotifications({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof notificationQueryKeys)['notifications']>>): Promise<
  IQueryResponse<INotification>
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

  const response = await apiHttp.get<IQueryResponse<INotification>>(apiRoutes.notifications, {
    params,
  });

  return response.data;
}

export const useGetNotification = <SelectReturnType = INotification, ErrorType = unknown>(
  { notificationId }: { notificationId: string },
  options?: UseQueryOptions<
    INotification | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof notificationQueryKeys)['notification']>
  >
) => {
  return useQuery<
    INotification | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof notificationQueryKeys)['notification']>
  >(notificationQueryKeys.notification(notificationId), fetchNotification, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetNotifications = <
  SelectData = IQueryResponse<INotification>,
  Error = unknown
>(
  query: TNotificationQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<INotification>,
    Error,
    SelectData,
    IQueryResponse<INotification>,
    ReturnType<(typeof notificationQueryKeys)['notifications']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<INotification>,
    Error,
    SelectData,
    ReturnType<(typeof notificationQueryKeys)['notifications']>
  >(notificationQueryKeys.notifications(query), fetchNotifications, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.oneMinute,
    refetchInterval: DURATIONS.oneMinute,
    ...options,
  });
};
