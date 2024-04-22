"use client";
import withClientAuth from '@app/HOFs/client/withClientAuth';
import { SearchUser } from '@components/SearchUser/SearchUser';
import { FriendList } from '@components/user/FriendList';

const Friends = () => {
  return (
    <div className="flex flex-col max-w-lg justify-center mx-auto w-full relative">
      <div className='absolute w-full top-0'>
        <SearchUser />
      </div>
      <div className='mt-20'>
        <FriendList />
      </div>
    </div>
  )
}

export default withClientAuth(Friends);