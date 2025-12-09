import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TechData } from "./types";

interface TechStore {
  techData: TechData | null;
  isGenerating: boolean;
  setTechData: (data: TechData) => void;
  updateTechData: (updates: Partial<TechData>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  clearTechData: () => void;
}

export const useTechStore = create<TechStore>()(
  persist(
    (set) => ({
      techData: null,
      isGenerating: false,
      setTechData: (data) => set({ techData: data }),
      updateTechData: (updates) =>
        set((state) => ({
          techData: state.techData ? { ...state.techData, ...updates } : null,
        })),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      clearTechData: () => set({ techData: null }),
    }),
    {
      name: "tech-storage",
    }
  )
);
