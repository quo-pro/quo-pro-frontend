import {
  IPost,
  IQuery,
} from '@quo-pro/commons';

export type TPostQuery = Partial<
  IQuery<Omit<IPost, '_id' | 'visibility' | 'user'>> & {
    visibility: string;
    user: string;
  }
>;

export type TUpsertPost = Omit<
  IPost,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'user'
>;