import { fetchPhotos } from '@/features/galleries/galleriesThunks';
import type { Photo } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface GalleriesState {
  photos: Photo[];
  photosFetching: boolean;
}

const initialState: GalleriesState = {
  photos: [],
  photosFetching: false,
};

export const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.photosFetching = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.photos = photos;
        state.photosFetching = false;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.photosFetching = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.photosFetching,
  },
});

export const { selectPhotos, selectPhotosFetching } = galleriesSlice.selectors;
