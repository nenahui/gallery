import { API_URL } from '@/consts';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: API_URL,
});
