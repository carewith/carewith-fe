import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type dosePerDay ={
    date:string;
    complete:number;
    incomplete:number;
}

export type dosePerDayList = {
    dosePerDays : dosePerDay[]
}

export type TimeStatus = {
    time:string;
    status:string;
}
export type HistoryResponse = {
    drugName:string;
    drugImage:string;
    timeAndStatuses: TimeStatus[]
}
export type HistoriesList = {
histories:HistoryResponse[]
}


export const getHistoryWeek = async (dispenserId:string):Promise<dosePerDayList> => {
     const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/history/${dispenserId}/week`,
    method: 'get',
  };

  const response = await requestWithAuth<dosePerDayList>(config);
  return response;
}



export const getHistoryMonth = async (dispenserId:string):Promise<dosePerDayList> => {
     const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/history/${dispenserId}/month`,
    method: 'get',
  };

  const response = await requestWithAuth<dosePerDayList>(config);
  return response;
}


export const getHistoryDay= async (dispenserId:string, date:string): Promise<HistoriesList> => {
      const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/history/${dispenserId}/data?=${date}`,
    method: 'get',
  };

  const response = await requestWithAuth<HistoriesList>(config);
  return response;
}
