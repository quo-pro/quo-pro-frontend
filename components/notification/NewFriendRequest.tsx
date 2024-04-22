import { FRIEND_REQUEST_STATUS_TYPE, INotification } from '@quo-pro/commons'
import { useTranslations } from 'next-intl'
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@components/ui/button';
import { useUpdateFriendRequest } from '@app/resources/follow-request/mutation';
import { toast } from '@components/ui/use-toast';

const NewFriendRequestNotification = (notification: INotification) => {
    const translate = useTranslations("general");
    const tErrors = useTranslations("errors");
    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
    const { mutateAsync: updateFriendRequest } = useUpdateFriendRequest()

    const onUpdateFriendRequest = async (status: FRIEND_REQUEST_STATUS_TYPE) => {
        try {
            const response = await updateFriendRequest({
                _id: notification.triggerRecordId,
                status
            });

            if (response?.status === 401) {
                toast({ title: tErrors('error'), description: tErrors('genericError'), className: 'bg-white', duration: 2000 });
            } else {
                toast({
                    title: status === 'WITHDRAWN' ? translate('requestWithdrawn') : translate('requestSent'),
                    duration: 1000,
                });
            }
        } catch (error) {
            toast({ title: tErrors('genericError'), className: 'bg-white', duration: 2000 });
        }
    };

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <p className='text-sm'> <strong className='capitalize'>{notification.sentBy.displayName}</strong> {translate("isRequestingToFollow")}</p>
                <p className='text-xs text-gray-400'>{timeAgo}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <Button size="sm" onClick={() => onUpdateFriendRequest('ACCEPTED')}>{translate("accept")}</Button>
                <Button size="sm" variant="outline" onClick={() => onUpdateFriendRequest('REJECTED')}>{translate("reject")}</Button>
            </div>
        </div>
    )
}


export default NewFriendRequestNotification