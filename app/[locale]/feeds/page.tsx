"use client";
import withClientAuth from '@app/HOFs/client/withClientAuth'
import { FeedList } from '@components/feed/FeedList';
import NewPost from '@components/feed/NewPost'

const Feeds = () => {
  return (
    <div className="flex flex-col max-w-lg justify-center mx-auto w-full gap-4">
      <NewPost />
      <FeedList />
    </div>
  )
}

export default withClientAuth(Feeds)