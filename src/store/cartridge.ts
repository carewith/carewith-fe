import {create} from "zustand";
import { devtools } from "zustand/middleware";
import { Cartridge, CartridgeId, CartridgeWithSchedule, registCartridgeWithSchedule } from "@/service/cartridge";

interface CartridgeState {
  cartridgeData: Partial<CartridgeWithSchedule>;
  loading: boolean;
  error: string | null;
  setCartridgeNumber: (number: number) => void;
  setCartridgeDetails: (details: Partial<Cartridge>) => void;
  setCartridgeSchedule: (schedule: CartridgeWithSchedule["schedules"]) => void;
  clearCartridgeData: () => void;
  submitCartridgeData: () => Promise<CartridgeId>;
}

export const useCartridgeStore = create<CartridgeState>()(
  devtools((set, get) => ({
    cartridgeData: {},
    loading: false,
    error: null,

    setCartridgeNumber: (number) => {
      set((state) => ({
        cartridgeData: {
          ...state.cartridgeData,
          number,
        },
      }));
    },

    setCartridgeDetails: (details) => {
      set((state) => ({
        cartridgeData: {
          ...state.cartridgeData,
          ...details,
        },
      }));
    },

    setCartridgeSchedule: (schedule) => {
      set((state) => ({
        cartridgeData: {
          ...state.cartridgeData,
          schedule,
        },
      }));
    },

    clearCartridgeData: () => {
      set({
        cartridgeData: {},
      });
    },

    submitCartridgeData: async () => {
      set({ loading: true, error: null });
      try {
        const cartridgeData = get().cartridgeData;
        const cartridgeId = await registCartridgeWithSchedule(cartridgeData as CartridgeWithSchedule);
        set({ loading: false });
        return cartridgeId;
      } catch (error) {
        set({ error: "Failed to submit cartridge data", loading: false });
        throw error;
      }
    },
  }))
);
