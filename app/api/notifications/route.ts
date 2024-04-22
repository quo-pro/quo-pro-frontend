import withServerAuth from '@app/HOFs/server/withServerAuth';
import { apiResponse } from '@app/handlers/api-response/response-handler';
import { apiRoutes, axiosHttp } from '@lib/axiosHttp';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const fetchNotifications = async (req: NextRequest, res: NextResponse) => {
  try {
    const response = await axiosHttp.get(apiRoutes.notifications, { params: req.nextUrl.searchParams });
    return apiResponse({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorResponse = {
        data: axiosError.response.data,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
      };
      return apiResponse({
        status: errorResponse.status,
        message: axiosError.message,
        data: errorResponse.data,
      });
    } else {
      return apiResponse({ status: 500, message: axiosError.message });
    }
  }
};

const createNotification = async (req: NextRequest, res: NextResponse) => {
  try {
    const payload = await req.json();
    const response = await axiosHttp.post(apiRoutes.notifications, payload);
    return apiResponse({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorResponse = {
        data: axiosError.response.data,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
      };
      return apiResponse({
        status: errorResponse.status,
        message: axiosError.message,
        data: errorResponse.data,
      });
    } else {
      return apiResponse({ status: 500, message: axiosError.message });
    }
  }
};

const GET = withServerAuth(fetchNotifications);
const POST = withServerAuth(createNotification);

export { GET, POST };
