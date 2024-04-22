import withServerAuth from '@app/HOFs/server/withServerAuth';
import { apiResponse } from '@app/handlers/api-response/response-handler';
import { apiRoutes, axiosHttp } from '@lib/axiosHttp';
import { AxiosError } from 'axios';
import { NextRequest } from 'next/server';

const blockUser = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = context.params.id;

    if (!id) {
      return apiResponse({
        status: 400,
        message: 'ID is required',
      });
    }

    const response = await axiosHttp.delete(`${apiRoutes.users}/${id}/unblock`);
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

const DELETE = withServerAuth(blockUser);

export { DELETE };
