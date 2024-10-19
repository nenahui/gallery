import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { MainNav } from '@/components/mainNav/mainNav';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { selectUser } from '@/features/users/usersSlice';
import { logout } from '@/features/users/usersThunks';
import { ArrowRightStartOnRectangleIcon, SquaresPlusIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PopoverClose } from '@radix-ui/react-popover';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-14 max-w-6xl mx-auto items-center'>
        <MainNav user={user} />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center gap-2'>
            {user ? (
              <div className={'space-x-2'}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size={'sm'} variant={'ghost'}>
                      Logout
                      <ArrowRightStartOnRectangleIcon className={'size-4 ml-1'} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={'max-w-max space-x-1 p-2'}>
                    <small className={'block text-center mb-1'}>Do you want to logout?</small>
                    <div className={'flex gap-1'}>
                      <PopoverClose asChild>
                        <Button size={'sm'} variant={'outline'}>
                          Cancel
                          <XMarkIcon />
                        </Button>
                      </PopoverClose>
                      <PopoverClose asChild>
                        <Button onClick={handleLogout} size={'sm'}>
                          Logout <ArrowRightStartOnRectangleIcon className={'size-4'} />
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button size={'sm'}>
                  Add new photo
                  <SquaresPlusIcon className={'text-white ml-1 size-4'} />
                </Button>
              </div>
            ) : (
              <Link to={'/login'}>
                <Button size={'sm'} variant={'ghost'}>
                  Login
                  <UserIcon />
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
