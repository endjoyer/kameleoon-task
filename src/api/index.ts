import axios from 'axios';
import { Site, Test } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3100',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTestById = {
  getAll: () => api.get<Test[]>('/tests'),
  getById: (id: number) => api.get<Test>(`/tests/${id}`),
};

export const getSiteById = {
  getAll: () => api.get<Site[]>('/sites'),
  getById: (id: number) => api.get<Site>(`/sites/${id}`),
};

// Обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);
