import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { API_URL } from '@/consts';
import { cn } from '@/lib/utils';
import type { User } from '@/types';
import { UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  user: User | null;
}

export const MainNav: React.FC<Props> = ({ user }) => {
  const { pathname } = useLocation();

  return (
    <div className='mr-4 flex'>
      {user && (
        <div className={'flex items-center gap-2 mr-4'}>
          <Avatar className={'border size-8'}>
            <AvatarFallback className={'bg-gray-200/50'}>
              <UserIcon className={'size-4 text-muted-foreground'} />
            </AvatarFallback>
            <AvatarImage src={user.googleId ? `${user.avatar}` : `${API_URL}/${user.avatar}`} alt={user.displayName} />
          </Avatar>
          <span className={'text-sm font-medium'}>{user.displayName}</span>
        </div>
      )}
      <nav className='flex items-center gap-4 text-sm'>
        <Link
          to='/'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Home
        </Link>
        {user && (
          <Link
            to={`/users/${user._id}`}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === `/users/${user._id}` ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            My Photos
          </Link>
        )}
      </nav>
    </div>
  );
};
