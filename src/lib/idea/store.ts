import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IdeaData {
  initialPrompt: string;
  ideaName: string;
  description: string;
  targetAudience: string;
  valueProposition: string;
}

interface IdeaStore {
  idea: IdeaData | null;
  setIdea: (idea: IdeaData) => void;
  updateIdea: (updates: Partial<IdeaData>) => void;
  clearIdea: () => void;
}

export const useIdeaStore = create<IdeaStore>()(
  persist(
    (set) => ({
      idea: null,
      setIdea: (idea) => set({ idea }),
      updateIdea: (updates) =>
        set((state) => ({
          idea: state.idea ? { ...state.idea, ...updates } : null,
        })),
      clearIdea: () => set({ idea: null }),
    }),
    {
      name: "idea-storage",
    }
  )
);



