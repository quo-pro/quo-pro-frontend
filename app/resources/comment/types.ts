import {
  IComment,
  IQuery,
} from '@quo-pro/commons';

export type TCommentQuery = Partial<
  IQuery<Omit<IComment, '_id'>> & {
    status: string;
  }
>;

export type TUpsertComment = Pick<
  IComment,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'user'
>;