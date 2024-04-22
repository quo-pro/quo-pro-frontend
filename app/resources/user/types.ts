import {
  IQuery,
  IUser,
} from '@quo-pro/commons';

export type TUserQuery = Partial<
  IQuery<Omit<IUser, '_id'>> & {
    status: string;
  }
>;

export type TUpsertUser = Omit<
  IUser,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'roles'
>;