import type { RootState } from '@/app/store';
import { API_URL } from '@/consts';
import type { Store } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  });
};
