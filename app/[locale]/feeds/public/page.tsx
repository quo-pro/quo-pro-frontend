"use client";
import PublicFeedList from '@components/feed/PublicFeedList';

const Feeds = () => {
    return (
        <div className="flex flex-col max-w-lg justify-center mx-auto w-full gap-4">
            <PublicFeedList />
        </div>
    )
}

export default Feeds;