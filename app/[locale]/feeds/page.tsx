"use client";
import withClientAuth from '@app/HOFs/client/withClientAuth'
import { FeedList } from '@components/feed/FeedList';
import NewPostWithPlateEditor from '@components/feed/NewPostWithPlateEditor';

const Feeds = () => {
  return (
    <div className="flex flex-col max-w-lg justify-center mx-auto w-full gap-4">
      <NewPostWithPlateEditor />
      <FeedList />
    </div>
  )
}

export default withClientAuth(Feeds)