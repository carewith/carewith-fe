import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type User = {
  name: string;
  profileImage: string;
};

export const getUserData = async (): Promise<User> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/user`,
    method: 'get',
  };

  const data = await requestWithAuth<User>(config);
  return data;
};
