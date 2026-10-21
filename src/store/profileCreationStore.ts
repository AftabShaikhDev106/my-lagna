import { create } from 'zustand';

export interface PartnerPreferences {
  ageRange: string;
  heightRange: string;
  religion: string;
  community: string;
  education: string;
  city: string;
}

export interface ProfileCreationState {
  currentStep: number;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | '';
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  height: string;
  religion: string;
  community: string;
  education: string;
  occupation: string;
  city: string;
  photos: string[];
  aboutYou: string;
  partnerPreferences: PartnerPreferences;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<Omit<ProfileCreationState, 'setStep' | 'nextStep' | 'prevStep' | 'updateData' | 'resetData'>>) => void;
  resetData: () => void;
}

const initialValues = {
  currentStep: 1,
  firstName: 'Aarav',
  lastName: 'Kulkarni',
  gender: 'Male' as const,
  dateOfBirth: {
    day: '25',
    month: 'Mar',
    year: '1999',
  },
  height: `5'8"`,
  religion: 'Hindu',
  community: 'Maratha',
  education: `Bachelor's Degree`,
  occupation: 'Software Engineer',
  city: 'Pune, Maharashtra',
  photos: [],
  aboutYou: '',
  partnerPreferences: {
    ageRange: '22 – 28 Years',
    heightRange: `5'2" – 5'10"`,
    religion: 'Hindu',
    community: 'Any',
    education: 'Any',
    city: 'Pune, Mumbai, Nashik',
  },
};

export const useProfileCreationStore = create<ProfileCreationState>((set) => ({
  ...initialValues,

  setStep: (step) => set({ currentStep: Math.min(Math.max(step, 1), 14) }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 14),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  updateData: (data) =>
    set((state) => ({
      ...state,
      ...data,
      partnerPreferences: data.partnerPreferences
        ? { ...state.partnerPreferences, ...data.partnerPreferences }
        : state.partnerPreferences,
    })),

  resetData: () => set(initialValues),
}));
