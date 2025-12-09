import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingStep = "market" | "personas" | "tech" | "complete";

interface OnboardingStore {
  currentStep: OnboardingStep;
  isOnboardingComplete: boolean;
  
  // Actions
  setStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const stepOrder: OnboardingStep[] = ["market", "personas", "tech", "complete"];

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      currentStep: "market",
      isOnboardingComplete: false,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
          const nextStep = stepOrder[currentIndex + 1];
          set({
            currentStep: nextStep,
            isOnboardingComplete: nextStep === "complete",
          });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepOrder[currentIndex - 1] });
        }
      },

      completeOnboarding: () =>
        set({ currentStep: "complete", isOnboardingComplete: true }),

      resetOnboarding: () =>
        set({ currentStep: "market", isOnboardingComplete: false }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);



