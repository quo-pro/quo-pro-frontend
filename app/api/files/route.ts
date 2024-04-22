import withServerAuth from '@app/HOFs/server/withServerAuth';
import { apiResponse } from '@app/handlers/api-response/response-handler';
import { apiRoutes, axiosFileHttp, axiosHttp } from '@lib/axiosHttp';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const fetchFile = async (req: NextRequest, res: NextResponse) => {
  try {
    const response = await axiosHttp.get(apiRoutes.files, { params: req.nextUrl.searchParams });
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

const createFile = async (req: NextRequest, res: NextResponse) => {
  try {
    const visibility = req.nextUrl.searchParams.get("visibility");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return apiResponse({ status: 400, message: 'NO_FILE_RECEIVED' });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = new Blob([buffer], { type: file.type });
    const formDataToSend = new FormData();
    formDataToSend.append('file', blob, file.name);

    const response = await axiosFileHttp.post(apiRoutes.files, formDataToSend, { params: { visibility } });

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

const GET = withServerAuth(fetchFile);
const POST = withServerAuth(createFile);

export { GET, POST };
