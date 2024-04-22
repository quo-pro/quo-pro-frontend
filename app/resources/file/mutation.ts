import { useMutation } from 'react-query';
import { IFileUpload } from './types';
import { apiHttp, apiRoutes } from '@lib/axiosHttp';
import { IFile, } from '@quo-pro/commons';

async function uploadFile({ file, fileName, fileKey, visibility }: IFileUpload) {
  const formData = new FormData();
  if (file instanceof Blob) {
    formData.append('file', file, fileName);
  } else {
    formData.append('file', file);
  }

  if (fileKey) {
    return apiHttp.patch<IFile>(`${apiRoutes.files}`, formData, { params: { visibility } });
  } else {
    return apiHttp.post<IFile>(`${apiRoutes.files}`, formData, { params: { visibility } });
  }
}

async function deleteFile(fileURI: string) {
  return apiHttp.delete<IFile>(`${apiRoutes.files}/${encodeURIComponent(fileURI)}`);
}

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => { },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => { },
  });
};