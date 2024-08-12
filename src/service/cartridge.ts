import { AxiosRequestConfig } from 'axios';
import { requestWithAuth } from '.';



export type CartridgeId = {
    id:string
}

export type Cartridge = {
  number: number,
  memo: string,
  dosage: number,
  doesPerDay: number,
  totalDoseDays: number,
  drugRemains: number,
  repeatable: true,
  reminderTerm: number,
  dispenserId: string,
  drugId: number,
  reminderSoundId: number
}
export type Schedule = {
    dayOfWeek:string,
    time:string
}

export type UsingCartridge = {
    usingNumbers : number[]
}

export type CartridgeWithSchedule = Cartridge & {
    schedule:Schedule[]
}

export type patchCartridge = Omit<Cartridge, 'dispenserId' | 'drugId' | 'reminderSoundId'>;

export type PatchCartridgeWithAlarmData = Omit<Cartridge, 'dispenserId' | 'drugId' | 'reminderSoundId'> & {
  schedules: Schedule[];
};



export const registCartridge = async (registData:Cartridge): Promise<CartridgeId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge`,
    method: 'post',
    data:registData
  };
  const data = await requestWithAuth<CartridgeId>(config);
  return data;
};

export const registCartridgeWithSchedule = async (registData:CartridgeWithSchedule): Promise<CartridgeId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/schedule`,
    method: 'post',
    data:registData
  };
  const data = await requestWithAuth<CartridgeId>(config);
  return data;
};

export const deleteCartridge = async (cartridgeId : string) :Promise<null> => {
     const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/${cartridgeId}`,
    method: 'delete',
  };
  const data = await requestWithAuth<null>(config);
  return data;
}


export const patchCartridgeMedicine = async (cartridgeId:string,updateData:patchCartridge): Promise<CartridgeId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/${cartridgeId}`,
    method: 'patch',
    data:updateData
  };

  const data = await requestWithAuth<CartridgeId>(config);
  return data;
};

export const getUsingCartridge = async (dispenserId:string): Promise<UsingCartridge> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/using/${dispenserId}`,
    method: 'get',
  };

  const data = await requestWithAuth<UsingCartridge>(config);
  return data;
};

export const patchCartridgeWithAlarm = async (cartridgeId:string,updateData:PatchCartridgeWithAlarmData): Promise<CartridgeId> => {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/${cartridgeId}/schedule`,
    method: 'patch',
    data:updateData
  };

  const data = await requestWithAuth<CartridgeId>(config);
  return data;
};
