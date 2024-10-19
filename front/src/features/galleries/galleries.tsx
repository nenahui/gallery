import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { PhotoCard } from '@/features/galleries/components/photoCard/photoCard';
import { selectPhotos, selectPhotosFetching } from '@/features/galleries/galleriesSlice';
import { fetchPhotos } from '@/features/galleries/galleriesThunks';
import React, { useEffect } from 'react';

export const Galleries: React.FC = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosFetching = useAppSelector(selectPhotosFetching);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (photosFetching) {
    return <Loader fixed />;
  }

  return (
    <>
      {!photosFetching && photos.length === 0 ? (
        <small className={'text-muted-foreground block text-center mx-auto'}>No photos found. </small>
      ) : (
        <div className={'grid grid-cols-2 lg:grid-cols-3 gap-3'}>
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      )}
    </>
  );
};
