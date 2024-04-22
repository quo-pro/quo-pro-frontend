import withAuthFallback from '@app/HOFs/client/withAuthFallback';
import { TRoute } from '@app/navigations/header.navigation';
import { useTranslations } from 'next-intl';
import React from 'react'
import Link from "next/link";
import { Button } from '@components/ui/button';

export const MenuLink = ({ icon: Icon, label, route }: TRoute) => {
    const translate = useTranslations("general");

    return (
        <Link
            key={label + route}
            href={route}>
            <Button variant="ghost" className="flex flex-row gap-2 items-center text-muted-foreground transition-colors hover:text-foreground">

                <Icon className='h-4' /> <span className='hidden md:inline'>{translate(label)}</span>
            </Button>
        </Link>
    )
}

const MenuLinkDisabled = ({ icon: Icon, label }: TRoute) => {
    const translate = useTranslations("general");

    return (
        <Button variant="ghost" className="flex flex-row gap-2 items-center text-muted-foreground transition-colors hover:text-foreground">
            <Icon className='h-4' /> <span className='hidden md:inline'>{translate(label)}</span>
        </Button>
    );
}

export default withAuthFallback({
    Component: MenuLink,
    Fallback: MenuLinkDisabled
})