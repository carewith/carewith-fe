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
  repeatable: boolean,
  reminderTerm: number,
  dispenserId: string | null,
  drugId: number,
  reminderSoundId: number
  since:string
}
export type Schedule = {
    dayOfWeek:string,
    time:string
}

export type CartridgeWithSchedule = Cartridge & {
    schedules:Schedule[]
}
export type CartirdgeWithSheduleWithOutTerm = Omit<CartridgeWithSchedule , 'reminderTerm'>;
export type UsingCartridge = {
    usingNumbers : number[]
}


export type patchCartridge = Omit<Cartridge, 'dispenserId' | 'drugId' | 'reminderSoundId'>;

export type PatchCartridgeWithAlarmData = Omit<Cartridge, 'dispenserId' | 'drugId' | 'reminderSoundId' | 'reminderTerm'> & {
  schedules: Schedule[];
};

export type TodayList = {
     cartridgeId: number,
        cartridgeNumber: number,
        drugImage: string,
        drugName: string,
        recentDayOfWeek: string,
        recentTime: string,
        expectedDayOfWeek:string,
        expectedTime: string,
        status:string,
        drugDescription:string,
        
}

export type TodayListResponse = {
    statuses : TodayList[]
}

export type DosingSchedule = {
    recentDayOfWeek: string | null;
    recentTime: string;
    expectedDayOfWeek: string;
    expectedTime: string;
    dosingStatus: string;
    cartridgeNumber: number;
    drugDivision: string;
    drugClassification: string;
    drugName: string;
    drugImage: string;
    drugDosage: number;
    drugDoesPerDay: number;
    drugTotalDoseDay: number;
    drugRemains: number;
    startDate: string;
    repeat: boolean;
    memo: string;
    times: string[];
    dates: string[];
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

export const registCartridgeWithSchedule = async (registData:CartirdgeWithSheduleWithOutTerm): Promise<CartridgeId> => {
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

export const getUsingCartridge = async (dispenserId:string|null): Promise<UsingCartridge> => {
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

export const getTodayCatridge = async(dispenserId : string |null): Promise<TodayListResponse> => {
    const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/status/now/${dispenserId}`,
    method: 'get',
  };

  const response = await requestWithAuth<TodayListResponse>(config);
  return response;
}

export const getAllCatridge = async(dispenserId : string ): Promise<TodayListResponse> => {
    const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/status/all/${dispenserId}`,
    method: 'get',
  };

  const response = await requestWithAuth<TodayListResponse>(config);
  return response;
}


export const getInfoCartridge = async (cartridgeId:string):Promise<DosingSchedule> => {
     const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/info/${cartridgeId}`,
    method: 'get',
  };

  const response = await requestWithAuth<DosingSchedule>(config);
  return response;
}

export const directCartridge = async (cartridgeId:string,amount:number)=> {
  const config: AxiosRequestConfig = {
    url: `${process.env.NEXT_API}/cartridge/${cartridgeId}/alarm/manual?amount=${amount}`,
    method: 'post',
  };
  const data = await requestWithAuth(config);
  return data;
};
