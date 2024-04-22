import { useMutation } from 'react-query';
import { queryClient } from '@lib/queryConfig';
import { TUpsertNotification } from './types';
import { notificationQueryKeys } from './queries';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { INotification } from '@quo-pro/commons';
import { userQueryKeys } from '../user/queries';

