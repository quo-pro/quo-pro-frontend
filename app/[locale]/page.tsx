
import { unstable_setRequestLocale } from 'next-intl/server';
import Feeds from './feeds/page';

export default function Landing({ params: { locale } }: any) {
  unstable_setRequestLocale('en');
  return <Feeds />;
}
