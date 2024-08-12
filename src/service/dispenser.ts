import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type Dispenser = {
    id:string
}

export type DispenserWithStatus = Dispenser & {
    status: string;
}

export type DispenserListType = {
    count:number,
    dispensers:DispenserWithStatus[]
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



export const registDispenser = async (dispenserId: string, patientId: number): Promise<Dispenser> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/${dispenserId}`,
    method: 'post',
    data: {
        patientId
    },
  };

  const response = await requestWithAuth<Dispenser>(config);
  return response;
};
