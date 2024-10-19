import { axiosApi } from '@/axiosApi';
import type { Photo } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk('galleries/fetchPhotos', async () => {
  const { data: photos } = await axiosApi.get<Photo[]>('/galleries');

  return photos;
});
