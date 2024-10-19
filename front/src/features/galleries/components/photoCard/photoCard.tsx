import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { API_URL } from '@/consts';
import { PhotoModal } from '@/features/galleries/components/photoModal/photoModal';
import { selectPhotosDeleting } from '@/features/galleries/galleriesSlice';
import { deletePhoto, fetchPhotos, fetchPhotosUser } from '@/features/galleries/galleriesThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { Photo } from '@/types';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PopoverClose } from '@radix-ui/react-popover';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { pathname: path } = useLocation();
  const photosDeleting = useAppSelector(selectPhotosDeleting);

  const fetchPhotosFn = async () => {
    if (path === '/') {
      dispatch(fetchPhotos());
    } else if (user && path === `/users/${user._id}`) {
      dispatch(fetchPhotosUser(user._id));
    }
  };

  const handleDelete = async () => {
    await dispatch(deletePhoto(photo._id)).unwrap();
    await fetchPhotosFn();
  };

  return (
    <Card
      className={`shadow-none space-y-2 dark bg-zinc-800 relative p-3 ${photosDeleting === photo._id && 'opacity-10'}`}
    >
      <Link to={`/users/${photo.author._id}`}>
        <div className={'flex items-center gap-1.5'}>
          <img
            className={'rounded-full size-12 border'}
            src={photo.author.googleId ? photo.author.avatar : `${API_URL}/${photo.author.avatar}`}
            alt={`${photo.author.displayName} avatar`}
          />

          <div className={'flex flex-col relative z-30'}>
            <span className={'text-sm font-medium leading-none'}>{photo.author.displayName}</span>
            <span className={'text-xs leading-none text-muted-foreground'}>{photo.author.username}</span>
          </div>
        </div>
      </Link>

      <div className={'relative z-30'}>
        <h4 className={'font-medium leading-none'}>{photo.title}</h4>
        <p className={'text-xs text-muted-foreground line-clamp-2'}>{photo.description}</p>
      </div>

      <PhotoModal photo={photo}>
        <div className={'relative cursor-pointer'}>
          <img
            className={'rounded-lg relative z-20 object-cover w-full h-full lg:h-96'}
            src={`${API_URL}/${photo.image}`}
            alt={`${photo.title} image`}
          />
          <img
            className={'rounded-screenSizeLg absolute top-0 z-10 backdrop-blur-xl h- blur-2xl h-full object-cover'}
            src={`${API_URL}/${photo.image}`}
            alt={`${photo.title} image`}
          />
        </div>
      </PhotoModal>

      {(photo.author._id === user?._id || user?.role === 'admin') && (
        <Popover>
          <PopoverTrigger asChild>
            <button className={'absolute bg-gray-200 p-0.5 top-2 right-2 rounded-lg'}>
              <TrashIcon className={'size-6 text-black'} strokeWidth={0.9} />
            </button>
          </PopoverTrigger>
          <PopoverContent className={'max-w-max space-x-1 p-2'}>
            <small className={'block text-center mb-1'}>Do you really want to delete?</small>
            <div className={'flex gap-1'}>
              <PopoverClose asChild>
                <Button size={'sm'} variant={'outline'} className={'flex-1'}>
                  Cancel
                  <XMarkIcon />
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button onClick={handleDelete} size={'sm'} className={'flex-1'}>
                  Delete <TrashIcon />
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {photosDeleting === photo._id && <Loader absolute />}
    </Card>
  );
};
