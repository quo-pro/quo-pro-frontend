"use client";
import { useGetUsers } from '@app/resources/user/queries';
import UserResultItem from '@components/user/UserResultItem';
import { useTranslations } from 'next-intl';
import { useRef, useCallback, useMemo } from 'react';

const AllUsers = () => {
    const translate = useTranslations("general");
    const {
        data: userListData,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetUsers({}, { suspense: false });

    const users = useMemo(() => {
        return userListData?.pages.flatMap(page => page.data) || [];
    }, [userListData]);

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
        <div className="flex flex-col max-w-lg justify-center mx-auto w-full relative gap-4">
            <p className='text-sm font-semibold'>{translate("suggestions")}</p>

            {users.map((user, index) => (
                <UserResultItem
                    key={user._id}
                    ref={index === users.length - 1 ? lastElementRef : null}
                    {...user}
                />
            ))}
        </div>
    )
}

export default AllUsers