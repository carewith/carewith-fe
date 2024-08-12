import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type PatientData = {
  name: string;
  birth: string;
  diseaseName: string;
  severity: number;
};

export type PatientId = {
    id:string
}
export const postPatientData = async (dispenserId: string ,patientData: PatientData): Promise<PatientId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/patient/${dispenserId}`,
    method: 'post',
    data: patientData, 
  };

  const response = await requestWithAuth<PatientId>(config);
  return response;
};

export const getPatientData = async (patientId: string): Promise<PatientData> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/patient/${patientId}`,
    method: 'get',
  };

  const response = await requestWithAuth<PatientData>(config);
  return response;
};

export const patchPatientData = async (patiendId:string,updateData:PatientData): Promise<PatientId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/patient/${patiendId}`,
    method: 'patch',
    data:updateData
  };

  const data = await requestWithAuth<PatientId>(config);
  return data;
};

export const getPatientBasedDispenserId = async (dispenserId: string): Promise<PatientData> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/patient/dispenser/${dispenserId}`,
    method: 'get',
  };

  const response = await requestWithAuth<PatientData>(config);
  return response;
};
