import axios, { AxiosError, AxiosResponse } from 'axios';
import apiConfig from '../config/api';
import { FormattedApiError } from '../types/errors';

const noAuthApiService = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept response to format the errors
noAuthApiService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<FormattedApiError> => {
    let formattedError: FormattedApiError = {
      error: true,
      message: 'An unexpected error occurred',
      errors: [],
    };

    if (error.response) {
      const { data, status } = error.response as AxiosResponse;

      formattedError = {
        error: true,
        message: data.message ?? 'An error occurred in our server',
        errors: data.errors ?? undefined,
        status: status,
      };
    }

    return Promise.reject(formattedError);
  },
);

export default noAuthApiService;
