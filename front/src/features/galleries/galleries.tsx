import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/consts';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { LogOut } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Galleries: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [navigate, user]);

  if (user === null) {
    return (
      <p className={'text-sm text-muted-foreground absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2'}>
        Please log in before visiting the site.
      </p>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={'grid place-items-center h-screen'}>
      <div className={'flex flex-col gap-2'}>
        <h1 className={'bg-gray-200 px-3 py-1 rounded-md inline-block text-sm'}>Username - {user.username}</h1>
        <h2 className={'bg-gray-200 px-3 py-1 rounded-md text-sm'}>Display name - {user.displayName}</h2>
        <h2 className={'bg-gray-200 px-3 py-1 rounded-md text-sm'}>ID - {user._id}</h2>
        <h3 className={'bg-gray-200 px-3 py-1 rounded-md text-sm'}>Token - {user.token}</h3>
        <img className={'size-64'} src={`${API_URL}/${user.avatar}`} alt={`${user.username} image`} />
        <Button onClick={handleLogout}>
          Logout <LogOut className={'size-4 ml-2'} />
        </Button>
      </div>
    </div>
  );
};
