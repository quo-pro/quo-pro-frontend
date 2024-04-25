import { useGetPosts } from '@app/resources/post/queries';
import React, { useCallback, useMemo, useRef } from 'react'
import FeedItemWithQuoViewer from './FeedItemWithQuoViewer';

export const FeedList = () => {
    const {
        data: listData,
        isLoading,
        isFetchingNextPage,
        fetchNextPage, hasNextPage
    } = useGetPosts({}, { suspense: false });

    const list = useMemo(() => {
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
        <div className='flex flex-col gap-4'>
            {list.map((feed, index) => (
                <FeedItemWithQuoViewer
                    isLast={list.length - 1 === index}
                    key={feed._id}
                    ref={index === list.length - 1 ? lastElementRef : null}
                    {...feed}
                />
            ))}

            {isFetchingNextPage && <p>Loading more...</p>}
            {isLoading && <p>Loading feeds...</p>}
        </div>
    )
}
