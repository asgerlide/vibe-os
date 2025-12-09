import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MarketData } from "./types";

interface MarketStore {
  marketData: MarketData | null;
  isGenerating: boolean;
  setMarketData: (data: MarketData) => void;
  updateMarketData: (updates: Partial<MarketData>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  clearMarketData: () => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      marketData: null,
      isGenerating: false,
      setMarketData: (data) => set({ marketData: data }),
      updateMarketData: (updates) =>
        set((state) => ({
          marketData: state.marketData
            ? { ...state.marketData, ...updates }
            : null,
        })),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      clearMarketData: () => set({ marketData: null }),
    }),
    {
      name: "market-storage",
    }
  )
);



