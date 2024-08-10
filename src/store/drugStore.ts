import { create } from "zustand";
import axios from "axios";

type Drug = {
  id: number;
  name: string;
  identifier: number;
  produce: string;
  description: string;
  classification: string;
  division: string;
  longLength: number;
  shortLength: number;
  thick: number;
  imageUrl: string;
};

type DrugStore = {
  drugs: Drug[];
  loading: boolean;
  error: string | null;
  searchDrugs: (keyword: string) => void;
};

export const useDrugStore = create<DrugStore>((set) => ({
  drugs: [],
  loading: false,
  error: null,
  searchDrugs: async (keyword: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.carewith.life/api/v1/drug/all/keyword?keyword=${keyword}`
      );
      const drugs = response.data.data.drugs;
      set({ drugs, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch drugs", loading: false });
    }
  },
}));

type SearchState = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  clearKeyword: () => void; 

};

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  setKeyword: (keyword: string) => set({ keyword }),
  clearKeyword: () => set({ keyword: "" })
}));
