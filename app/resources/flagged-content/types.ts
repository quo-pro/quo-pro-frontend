import {
  IQuery,
  IFlaggedContent,
} from '@quo-pro/commons';

export type TFlaggedContentQuery = Partial<
  IQuery<Omit<IFlaggedContent, '_id'>> & {}
>;

export type TUpsertFlaggedContent = Pick<IFlaggedContent, 'reason'> & {
  post: string;
}