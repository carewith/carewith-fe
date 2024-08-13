import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type Dispenser = {
    dispenserId:string
}

export type DispenserData ={
    name:string;
    location:string;
    volume:number;
}
export type DispenserWithStatus = Dispenser & {
    status: string;
}

export type DispenserListType = {
    count:number,
    dispensers:DispenserWithStatus[]
}
export type ProgressBar = {
    percent:number;
}

export type AsdType= {
    time:string;
    incomplete:number;
    complete:number;
    expected:number;
}
export type DosePerTimes = {
    dosePerTime :AsdType[]
}

export const getDispenserId = async (): Promise<Dispenser> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/id`,
    method: 'get',
  };

  const data = await requestWithAuth<Dispenser>(config);
  return data;
};

export const getDispenserList = async (): Promise<DispenserListType> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser`,
    method: 'get',
  };

  const data = await requestWithAuth<DispenserListType>(config);
  return data;
};

export const getProgressBar = async (dispenserId:string): Promise<ProgressBar> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/${dispenserId}/progress`,
    method: 'get',
  };
  const data = await requestWithAuth<ProgressBar>(config);
  return data;
};

export const getAsdPerTime = async (dispenserId:string): Promise<DosePerTimes> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/${dispenserId}/pertime`,
    method: 'get',
  };
  const data = await requestWithAuth<DosePerTimes>(config);
  return data;
};


export const getMainDispenser = async (): Promise<DispenserWithStatus> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/main`,
    method: 'get',
  };

  const data = await requestWithAuth<DispenserWithStatus>(config);
  return data;
};

export const patchMainDispenser = async (dispenserId:string): Promise<Dispenser> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/main/${dispenserId}`,
    method: 'patch',
  };

  const data = await requestWithAuth<Dispenser>(config);
  return data;
};



export const registDispenser = async (dispenserId: string, dispencerData:DispenserData): Promise<Dispenser> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/${dispenserId}`,
    method: 'post',
    data: dispencerData
  };
  const response = await requestWithAuth<Dispenser>(config);
  return response;
};

