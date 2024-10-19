import { axiosApi } from '@/axiosApi';
import type { Photo, PhotoMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk('galleries/fetchPhotos', async () => {
  const { data: photos } = await axiosApi.get<Photo[]>('/galleries');

  return photos;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation>(
  'galleries/createPhoto',
  async (photoMutation: PhotoMutation) => {
    const formData = new FormData();

    const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];
    keys.forEach((key) => {
      const value = photoMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<Photo>('/galleries', formData);
  }
);

export const deletePhoto = createAsyncThunk<void, string>('galleries/deletePhoto', async (id: string) => {
  await axiosApi.delete(`/galleries/${id}`);
});

export const fetchPhotosUser = createAsyncThunk('galleries/fetchPhotosUser', async (authorId: string) => {
  const { data: photos } = await axiosApi.get<Photo[]>(`/galleries/users/${authorId}`);

  return photos;
});
