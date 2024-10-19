import { createPhoto, fetchPhotos } from '@/features/galleries/galleriesThunks';
import type { Photo } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface GalleriesState {
  photos: Photo[];
  photosFetching: boolean;
  photosCreating: boolean;
}

const initialState: GalleriesState = {
  photos: [],
  photosFetching: false,
  photosCreating: false,
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

    builder
      .addCase(createPhoto.pending, (state) => {
        state.photosCreating = true;
      })
      .addCase(createPhoto.fulfilled, (state) => {
        state.photosCreating = false;
      })
      .addCase(createPhoto.rejected, (state) => {
        state.photosCreating = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosFetching: (state) => state.photosFetching,
    selectPhotosCreating: (state) => state.photosCreating,
  },
});

export const { selectPhotos, selectPhotosFetching, selectPhotosCreating } = galleriesSlice.selectors;
