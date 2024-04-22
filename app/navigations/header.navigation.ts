import { SVG, TSVGType } from '@components/svgs/SVG';
import NAVIGATION from './navigation';

export type TRoute = {
    label: string;
    route: string;
    icon: TSVGType;
    fallback: string
}

export const RIGHT_HEADER_ROUTES: TRoute[] = [
    {
        label: 'home',
        icon: SVG.feeds,
        route: NAVIGATION.FEEDS,
        fallback: NAVIGATION.PUBLIC_FEEDS

    },
    {
        label: 'friends',
        icon: SVG.users,
        route: NAVIGATION.FRIENDS,
        fallback: NAVIGATION.FEEDS
    }
]