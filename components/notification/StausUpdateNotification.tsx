import { INotification } from '@quo-pro/commons'
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';

const StatusUpdateNotification = (notification: INotification) => {
    const translate = useTranslations("general");
    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

    return (
        <div>
            <p className='text-sm'>
                <strong className='capitalize'>{notification.sentBy.displayName}</strong>
                <span className='mx-2'>&#183;</span>
                <span className='text-green-600 text-xs'>{translate("status")}</span>
            </p>
            <p className='text-xs text-gray-400'>{timeAgo}</p>
            <p>
                {notification.message}
            </p>
        </div>
    )
}


export default StatusUpdateNotification