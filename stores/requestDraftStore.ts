import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BloodRequestInput } from "@/lib/validation/blood-request.validation";

interface RequestDraftState {
  draft: Partial<BloodRequestInput>;
  step: number;
  setDraft: (values: Partial<BloodRequestInput>) => void;
  setStep: (step: number) => void;
  clear: () => void;
}

export const useRequestDraft = create<RequestDraftState>()(
  persist(
    (set) => ({
      draft: {},
      step: 0,
      setDraft: (values) => set({ draft: values }),
      setStep: (step) => set({ step }),
      clear: () => set({ draft: {}, step: 0 }),
    }),
    {
      name: "blood-request-draft",
      storage: createJSONStorage(() => sessionStorage),
      // Rehydrate manually after mount so server and client HTML match
      skipHydration: true,
    },
  ),
);