import axios, { AxiosError, AxiosResponse } from 'axios';
import apiConfig from '../config/api';
import { useAuthStore } from '../store/useAuthStore';
import { FormattedApiError } from '../types/errors';

const apiService = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request to add the auth token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(apiConfig.apiTokenIdentifier);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response to format errors and handle unauthorized responses
apiService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<FormattedApiError> => {
    // Check if error is a cancel error and ignore it
    if (axios.isCancel(error)) {
      console.log(error.message);
      return new Promise(() => {}); // Return a pending promise to avoid triggering catch blocks
    }

    let formattedError: FormattedApiError = {
      error: true,
      message: 'An unexpected error occurred',
      errors: [],
    };

    if ((error as AxiosError).response) {
      const { data, status } = (error as AxiosError).response as AxiosResponse;

      formattedError = {
        error: true,
        message: data.message ?? 'An error occurred in our server',
        errors: data.errors ?? undefined,
        status: status,
      };

      // Log out the user if the token has expired
      if (status === 401) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(formattedError);
  }
);

export default apiService;
