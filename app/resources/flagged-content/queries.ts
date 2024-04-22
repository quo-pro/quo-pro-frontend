import { DURATIONS } from '@app/constants/general';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { IQueryResponse, IFlaggedContent } from '@quo-pro/commons';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { TFlaggedContentQuery } from './types';

export const flaggedContentQueryKeys = {
  all: [{ scope: 'flaggedContents' }] as const,
  flaggedContent: (flaggedContentId: string) =>
    [
      {
        ...flaggedContentQueryKeys.all[0],
        entity: 'single flaggedContent',
        flaggedContentId,
      },
    ] as const,
  flaggedContents: (query: TFlaggedContentQuery) =>
    [
      {
        ...flaggedContentQueryKeys.all[0],
        entity: 'flaggedContent list',
        ...query,
      },
    ] as const,
};

async function fetchFlaggedContent({
  queryKey: [{ flaggedContentId }],
}: QueryFunctionContext<ReturnType<(typeof flaggedContentQueryKeys)['flaggedContent']>>) {
  if (!flaggedContentId) {
    return null;
  }
  const res = await apiHttp.get<IFlaggedContent>(`${apiRoutes.flaggedContents}/${flaggedContentId}`);
  return res.data;
}

async function fetchFlaggedContents({
  pageParam = 1,
  queryKey: [{ sort_by, search_value, limit, startDate, endDate, status }],
}: QueryFunctionContext<ReturnType<(typeof flaggedContentQueryKeys)['flaggedContents']>>): Promise<
  IQueryResponse<IFlaggedContent>
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

  const response = await apiHttp.get<IQueryResponse<IFlaggedContent>>(apiRoutes.flaggedContents, {
    params,
  });

  return response.data;
}

export const useGetFlaggedContent = <SelectReturnType = IFlaggedContent, ErrorType = unknown>(
  { flaggedContentId }: { flaggedContentId: string },
  options?: UseQueryOptions<
    IFlaggedContent | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof flaggedContentQueryKeys)['flaggedContent']>
  >
) => {
  return useQuery<
    IFlaggedContent | null | undefined,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof flaggedContentQueryKeys)['flaggedContent']>
  >(flaggedContentQueryKeys.flaggedContent(flaggedContentId), fetchFlaggedContent, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetFlaggedContents = <
  SelectData = IQueryResponse<IFlaggedContent>,
  Error = unknown
>(
  query: TFlaggedContentQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IFlaggedContent>,
    Error,
    SelectData,
    IQueryResponse<IFlaggedContent>,
    ReturnType<(typeof flaggedContentQueryKeys)['flaggedContents']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IFlaggedContent>,
    Error,
    SelectData,
    ReturnType<(typeof flaggedContentQueryKeys)['flaggedContents']>
  >(flaggedContentQueryKeys.flaggedContents(query), fetchFlaggedContents, {
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
