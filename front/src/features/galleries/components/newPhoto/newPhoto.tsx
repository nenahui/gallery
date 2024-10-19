import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectPhotosCreating } from '@/features/galleries/galleriesSlice';
import { createPhoto, fetchPhotos, fetchPhotosUser } from '@/features/galleries/galleriesThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { PhotoMutation } from '@/types';
import React, { type PropsWithChildren, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLocation } from 'react-router-dom';

const initialState: PhotoMutation = {
  title: '',
  description: '',
  image: null,
};

export const NewPhoto: React.FC<PropsWithChildren> = ({ children }) => {
  const [photoMutation, setPhotoMutation] = useState<PhotoMutation>(initialState);
  const dispatch = useAppDispatch();
  const photosCreating = useAppSelector(selectPhotosCreating);
  const closeRef = useRef<HTMLButtonElement>(null);
  const user = useAppSelector(selectUser);
  const { pathname: path } = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setPhotoMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setPhotoMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(createPhoto(photoMutation)).unwrap();
    closeRef.current?.click();
    setPhotoMutation(initialState);
    if (path === '/') {
      dispatch(fetchPhotos());
    } else if (user && path === `/users/${user._id}`) {
      dispatch(fetchPhotosUser(user._id));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'gap-1'}>
        <DialogHeader>
          <DialogTitle>New photo</DialogTitle>
          <DialogDescription>Fill in the form below to add a new photo to the gallery.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className={'space-y-2'}>
          <div>
            <Label htmlFor={'title'}>Title</Label>
            <Input
              id={'title'}
              value={photoMutation.title}
              onChange={handleChange}
              placeholder={'Enter title'}
              required
            />
          </div>

          <div>
            <Label htmlFor={'description'}>Description</Label>
            <Textarea
              rows={3}
              id={'description'}
              value={photoMutation.description}
              onChange={handleChange}
              placeholder={'Enter description'}
              className={'resize-none'}
              required
            />
          </div>

          <div>
            <Label htmlFor={'image'}>Image</Label>
            <Input id={'image'} onChange={handleImageChange} type={'file'} required />
          </div>

          <Button disabled={photosCreating} type={'submit'} className={'w-full'}>
            Create {photosCreating && <Loader />}
          </Button>
          <DialogClose ref={closeRef} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
