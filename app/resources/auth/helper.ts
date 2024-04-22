import {
  TCredentialAuthResponse,
  TCredentials,
} from '@app/resources/auth/types';
import { axiosHttp, apiRoutes } from '@lib/axiosHttp';

/**
 * Authenticate user
 * @param {ICredentials} credentials - The user credentials.
 */
export const login = async (credentials: TCredentials) => {
  try {
    const res = await axiosHttp.post<TCredentialAuthResponse>(
      apiRoutes.login,
      credentials
    );

    if (res.data && res.data.accessToken) {
      return {
        id: res.data.id,
        name: credentials.userName,
        email: credentials.userName,
        roles: res.data.roles,
        accessToken: res.data.accessToken,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
