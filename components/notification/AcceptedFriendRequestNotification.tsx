import { INotification } from '@quo-pro/commons'
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';

const AcceptedFriendRequestNotification = (notification: INotification) => {
    const translate = useTranslations("general");
    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

    return (
        <div>
            <p className='text-sm'> <strong className='capitalize'>{notification.sentBy.displayName}</strong> {translate("hasAcceptedYourRequest")}</p>
            <p className='text-xs text-gray-400'>{timeAgo}</p>
        </div>
    )
}


export default AcceptedFriendRequestNotification