import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type fcmToken = {
    token:string
}
export const registFcmToken = async (token:string)=> {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/user/fcm/token`,
    method: 'patch',
    data:{
        token:token
    }
  };
  const data = await requestWithAuth(config);
  return data;
};
