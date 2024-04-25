import Link from "next/link"
import { SVG } from '@components/svgs/SVG'
import { RIGHT_HEADER_ROUTES } from '@app/navigations/header.navigation'
import UserProfileMenu from '@components/protected/UserProfileMenu'
import MenuLink from './MenuLink'
import NAVIGATION from '@app/navigations/navigation'
import NotificationMenu from '@components/notification/NotificationMenu'

export const AppHeader = () => {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href={NAVIGATION.PUBLIC_FEEDS}
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <SVG.logo className="h-8 w-8" />
                    <span className="sr-only">Quo-pro</span>
                </Link>
            </nav>

            <nav className="justify-center w-full gap-2text-lg font-medium flex flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {
                    RIGHT_HEADER_ROUTES.map(r => (
                        <MenuLink key={r.label + r.route} {...r} />
                    ))
                }
            </nav>

            <div className="flex w-fit items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <NotificationMenu />
                <UserProfileMenu />
            </div>
        </header>
    )
}
