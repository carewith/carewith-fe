import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';

export type drugNameList = {
    drugNames:string[]
}
export type CombineResponse = {
    isCombinable :boolean;
    caution : string;
}
export const combineMedicine = async (dispenserId:string|null,drugList:string[]): Promise<CombineResponse> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/drug/check/${dispenserId}`,
    method: 'post',
    data:{
        drugNames:[
            ...drugList
        ]
    }
  };
  const data = await requestWithAuth<CombineResponse>(config);
  return data;
};
