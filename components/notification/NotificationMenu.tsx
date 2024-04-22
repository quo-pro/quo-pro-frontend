import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import withAuthFallback from '@app/HOFs/client/withAuthFallback';
import { useTranslations } from 'next-intl';
import { SVG } from '@components/svgs/SVG';
import { Badge } from "@/components/ui/badge"
import { useGetNotifications } from '@app/resources/notifications/queries';
import NotificationItem from './NotificationItem';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';
import { useSocket } from '@utils/hooks/useWebSocket/useWebSocket';

const Trigger = () => (
    <Button variant="secondary" size="icon" className="rounded-full">
        <SVG.notificationDotBell />
        <span className="sr-only">Toggle notification menu</span>
    </Button>
)
const NotificationMenu = () => {
    const translate = useTranslations("general");
    const [count, setCount] = useState(0);
    const {
        data: listData,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch
    } = useGetNotifications({},);

    const notifications = useMemo(() => {
        return listData?.pages.flatMap(page => page.data) || [];
    }, [listData]);

    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const { } = useSocket({
        onEventReceived: (data: any) => {
            refetch();

            if (data.type !== 'GHOST') {
                setCount(value => (value + 1));
            }

        }
    });

    const countValue = useMemo(() => {
        return count
    }, [count])

    return (
        <DropdownMenu onOpenChange={() => setCount(0)}>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className='relative'
                >
                    <SVG.notificationDotBell />
                    {
                        countValue > 0 &&
                        <Badge
                            variant="destructive"
                            className='absolute rounded-full h-4 w-4 p-0 flex justify-center items-center top-1 right-1'
                            style={{ fontSize: '0.5rem' }}
                        >
                            {countValue}
                        </Badge>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='max-w-sm w-full max-h-96 overflow-y-auto'>
                <DropdownMenuLabel>{translate("notifications")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification, index) => (
                    <span key={notification._id}>
                        <DropdownMenuItem >
                            <NotificationItem
                                {...notification}
                                ref={index === notifications.length - 1 ? lastElementRef : null} />
                        </DropdownMenuItem>
                        {!(index === notifications.length - 1) && <DropdownMenuSeparator />}
                    </span>
                ))}

                {
                    notifications.length === 0 && !isLoading &&
                    <Alert className='border-none'>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>{translate("noNewNotificationsTitle")}</AlertTitle>
                        <AlertDescription>
                            {translate("noNewNotificationsDescription")}
                        </AlertDescription>
                    </Alert>
                }

                {isFetchingNextPage && <p>Loading more...</p>}
                {isLoading && <p>Loading friends...</p>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default withAuthFallback({
    Component: NotificationMenu,
    Fallback: Trigger
});
