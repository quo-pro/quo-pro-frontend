import React, { useCallback, useMemo, useRef } from 'react';
import FriendResultItem from './FriendResultItem';
import { useGetFriends } from '@app/resources/user/queries';

export const FriendList = () => {
    const { data: listData, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetFriends({}, { suspense: false });

    const friends = useMemo(() => {
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

    return (
        <>
            <div className='flex flex-col gap-2'>
                {friends.map((friend, index) => (
                    <FriendResultItem
                        key={friend._id}
                        ref={index === friends.length - 1 ? lastElementRef : null}
                        {...friend} />
                ))}
                {isFetchingNextPage && <p>Loading more...</p>}
                {isLoading && <p>Loading friends...</p>}
            </div>
        </>
    );
};
