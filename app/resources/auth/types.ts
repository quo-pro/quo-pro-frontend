import { USER_ROLES_TYPE } from '@quo-pro/commons';
import { IAuth } from '@quo-pro/commons';

export type TCredentials = Pick<IAuth, 'userName' | 'UUID'>

export type TCredentialAuthResponse = {
  accessToken: string;
  id: string;
  roles: USER_ROLES_TYPE[];
}
