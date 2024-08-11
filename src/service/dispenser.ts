import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type Dispenser = {
    id:string
}

export const getDispenserId = async (): Promise<Dispenser> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/dispenser/id`,
    method: 'get',
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
