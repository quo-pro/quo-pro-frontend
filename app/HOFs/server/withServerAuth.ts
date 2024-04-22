import { apiResponse } from '@app/handlers/api-response/response-handler';
import { authConfig } from '@lib/authConfig';
import { axiosFileHttp, axiosHttp } from '@lib/axiosHttp';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const withServerAuth =
  (handler: Function) => async (req: NextRequest, res: NextResponse) => {
    try {
      const session = await getServerSession(authConfig);

      if (!session) {
        return apiResponse({ status: 401, message: 'NOT_AUTHORIZED' });
      }

      axiosHttp.interceptors.request.use(async (config) => {
        const session = await getServerSession(authConfig);
        config.headers['access-token'] = session?.accessToken;

        return config;
      });

      axiosFileHttp.interceptors.request.use(async (config) => {
        const session = await getServerSession(authConfig);
        config.headers['access-token'] = session?.accessToken;

        return config;
      });

      // If validated, call the actual route handler
      return await handler(req, res);
    } catch (error: any) {
      if (error.message === 'NOT_AUTHORIZED') {
        return apiResponse({
          status: 401,
          message: 'NOT_AUTHORIZED',
        });
      }

      return apiResponse({
        status: 401,
        message: 'SERVER_ERROR',
      });
    }
  };

export default withServerAuth;
