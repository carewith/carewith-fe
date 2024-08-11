import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type PatientData = {
  name: string;
  birth: string;
  diseaseName: string;
  since: string;
  severity: number;
};

export type patientId = {
    id:string
}
export const postPatientData = async (patientData: PatientData): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/patient`,
    method: 'post',
    data: patientData, 
  };

  const response = await requestWithAuth<patientId>(config);
  return response;
};
