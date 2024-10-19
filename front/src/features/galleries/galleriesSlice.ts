import { createPhoto, deletePhoto, fetchPhotos, fetchPhotosUser } from '@/features/galleries/galleriesThunks';
import type { Photo } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface GalleriesState {
  photos: Photo[];
  photosUser: Photo[];
  photosFetching: boolean;
  photosCreating: boolean;
  photosDeleting: string | null;
  photosFetchingUser: boolean;
}

const initialState: GalleriesState = {
  photos: [],
  photosUser: [],
  photosFetching: false,
  photosCreating: false,
  photosDeleting: null,
  photosFetchingUser: false,
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

    builder
      .addCase(deletePhoto.pending, (state, { meta }) => {
        state.photosDeleting = meta.arg;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.photosDeleting = null;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.photosDeleting = null;
      });

    builder
      .addCase(fetchPhotosUser.pending, (state) => {
        state.photosFetchingUser = true;
      })
      .addCase(fetchPhotosUser.fulfilled, (state, { payload: photos }) => {
        state.photosUser = photos;
        state.photosFetchingUser = false;
      })
      .addCase(fetchPhotosUser.rejected, (state) => {
        state.photosFetchingUser = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.photos,
    selectPhotosUser: (state) => state.photosUser,
    selectPhotosFetching: (state) => state.photosFetching,
    selectPhotosCreating: (state) => state.photosCreating,
    selectPhotosDeleting: (state) => state.photosDeleting,
    selectPhotosFetchingUser: (state) => state.photosFetchingUser,
  },
});

export const {
  selectPhotos,
  selectPhotosFetching,
  selectPhotosCreating,
  selectPhotosDeleting,
  selectPhotosFetchingUser,
  selectPhotosUser,
} = galleriesSlice.selectors;
