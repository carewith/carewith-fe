import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';
import { Schedule } from './cartridge';

export type ReminderId = {
    id:number
}

export type reminderSound={
    id:number;
    name:string;
    url:string;

}
export type responseReminder={
    preSignedUrl : string;
}

export type ReminderListType = {
    count:number,
    sounds:reminderSound[]
}

export const registReminder = async (filename:string): Promise<responseReminder> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/sound/presignedurl?filename=${filename}`,
    method: 'post',
  };

  const response = await requestWithAuth<responseReminder>(config);
  return response;
};

export const getReminder = async (): Promise<ReminderListType> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/sound`,
    method: 'get',
  };

  const response = await requestWithAuth<ReminderListType>(config);
  return response;
};
