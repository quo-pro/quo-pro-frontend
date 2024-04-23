"use client";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { useGetFriends, useGetUsers } from '@app/resources/user/queries';
import { UserResultItem } from '@components/user/UserResultItem';
import { useTranslations } from 'next-intl';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { CommandLoading } from 'cmdk';
import useOutsideClick from '@utils/hooks/useOutsideClick';

export const SearchUser = () => {
    const translate = useTranslations("general");
    const [search_value, setSearchValue] = useState<string>('');
    const [groupVisibility, setGroupVisibility] = useState<boolean>(false);
    const { data: friends } = useGetFriends({}, {});

    const hasFriends = useMemo(() => {
        const list = friends?.pages.flatMap(page => page.data) || [];
        return list.length > 0;
    }, [friends]);

    const debouncedSetSearchValue = useCallback(debounce(value => {
        setSearchValue(value);
        if (value !== "") setGroupVisibility(true);
    }, 300), []);

    const {
        data: userListData,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetUsers({ search_value }, { suspense: false });

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

    const commandRef = useRef<HTMLDivElement>(null);
    useOutsideClick<HTMLDivElement>(commandRef, () => {
        setGroupVisibility(false);
    });

    const shouldOpenGroupContainer = useMemo(() => {
        if (!hasFriends) return true;
        return search_value && groupVisibility;
    }, [groupVisibility, search_value, hasFriends])

    return (
        <Command ref={commandRef} className={`rounded-lg border ${shouldOpenGroupContainer ? 'shadow-md' : ''}`}>
            <CommandInput
                placeholder={translate("search")}
                onValueChange={debouncedSetSearchValue}
                onFocus={() => setGroupVisibility(true)}
            />
            {isLoading && <CommandLoading />}
            <CommandList>
                {users.length === 0 && search_value && !isLoading && <CommandEmpty>{translate("noResult")}</CommandEmpty>}
                <CommandGroup heading={translate("suggestions")} className={`${shouldOpenGroupContainer ? '' : 'hidden'}`}>
                    {users.map((user, index) => (
                        <CommandItem key={user._id} value={`${user.displayName}`}>
                            <UserResultItem
                                ref={index === users.length - 1 ? lastElementRef : null}
                                {...user}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
            {isFetchingNextPage && <p className='text-xs font-light m-4'>Loading more...</p>}
            {isLoading && <p className='text-xs font-light m-4'>Loading suggestions...</p>}
        </Command>
    );
};
