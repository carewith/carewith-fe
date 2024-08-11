import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies, setCookie } from 'nookies';

const refreshToken = async (): Promise<string> => {
  const cookies = parseCookies();
  const refreshToken = cookies['refreshToken'];

  if (!refreshToken) {
    throw new Error('Refresh token is missing.');
  }

  const response = await axios.post(
    `${process.env.NEXT_API}/auth/kakao/refresh`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    }
  );

  const newAccessToken = response.data.accessToken;
  setCookie(null, 'accessToken', newAccessToken, {
    maxAge: 6 * 60 * 60, 
    path: '/',
  });

  return newAccessToken;
};
export const requestWithAuth = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const cookies = parseCookies();
    const accessToken = cookies['accessToken'];

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${accessToken}`,
    };

    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${newAccessToken}`,
        };

        const retryResponse = await axios(config);
        return retryResponse.data;
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw refreshError;
      }
    }

    throw error;
  }
};
