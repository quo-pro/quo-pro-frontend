import {
  IQuery,
  IFriendRequest,
} from '@quo-pro/commons';

export type TFriendRequestQuery = Partial<
  IQuery<Omit<IFriendRequest, '_id'>> & {
    status: string;
  }
>;

export type TUpsertFriendRequest = Pick<IFriendRequest, 'status'> & {
  receiver: string;
}