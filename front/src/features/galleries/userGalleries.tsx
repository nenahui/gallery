import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { NewPhoto } from '@/features/galleries/components/newPhoto/newPhoto';
import { PhotoCard } from '@/features/galleries/components/photoCard/photoCard';
import { selectPhotosFetchingUser, selectPhotosUser } from '@/features/galleries/galleriesSlice';
import { fetchPhotosUser } from '@/features/galleries/galleriesThunks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const UserGalleries: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const photosUser = useAppSelector(selectPhotosUser);
  const photosUserFetching = useAppSelector(selectPhotosFetchingUser);

  useEffect(() => {
    dispatch(fetchPhotosUser(id));
  }, [dispatch, id]);

  return (
    <>
      {!photosUserFetching && photosUser.length === 0 ? (
        <small className={'text-muted-foreground block text-center mx-auto'}>
          You have no photos yet. <br />{' '}
          <NewPhoto>
            <button className={'underline'}>Add some!</button>
          </NewPhoto>
        </small>
      ) : (
        <div className={'grid grid-cols-2 lg:grid-cols-3 gap-3'}>
          {photosUser.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      )}
    </>
  );
};
