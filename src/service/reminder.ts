import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';
import { Schedule } from './cartridge';

export type ReminderId = {
    id:string
}
export const registAlarmData = async (cartridgeId: string ,alarmSchedule: Schedule[]): Promise<ReminderId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridgeId/${cartridgeId}/reminder`,
    method: 'post',
    data: alarmSchedule, 
  };

  const response = await requestWithAuth<ReminderId>(config);
  return response;
};

export const DeleteAlarmFormCartridge = async (cartridgeId: string): Promise<ReminderId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridgeId/${cartridgeId}/reminder`,
    method: 'delete',
  };

  const response = await requestWithAuth<ReminderId>(config);
  return response;
};

export const patchAlarmData = async (cartridgeId: string,alarmSchedule:Schedule[]): Promise<ReminderId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridgeId/${cartridgeId}/reminder`,
    method: 'patch',
    data:alarmSchedule
  };

  const data = await requestWithAuth<ReminderId>(config);
  return data;
};
