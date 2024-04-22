import { IFile } from '@quo-pro/commons';

export interface IFileUpload extends Pick<IFile, 'visibility'> {
  file: File | Blob;
  /**
   * Required if upload a blob file
   */
  fileName?: string
  /**
   * Required if you need to replace an existing file
   */
  fileKey?: string
}