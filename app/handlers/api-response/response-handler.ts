import { IHttpResponse } from '@quo-pro/commons';
import { NextResponse } from 'next/server';

export const apiResponse = <TData = any>({
  status,
  message,
  data,
}: Partial<IHttpResponse<TData>>) => {
  return NextResponse.json(data || message, { status });
};
