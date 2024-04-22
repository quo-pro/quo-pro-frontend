import {
  IQuery,
  INotification,
} from '@quo-pro/commons';

export type TNotificationQuery = Partial<
  IQuery<Omit<INotification, '_id'>> & {
    status: string;
  }
>;

export type TUpsertNotification = Pick<INotification, '_id' | 'status'>;