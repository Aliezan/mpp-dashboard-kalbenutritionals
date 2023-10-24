import { MPP } from '@prisma/client';
import { StateCreator } from 'zustand';

type ModifiedMPP = Omit<MPP, 'userId' | 'id' | 'isApproved' | 'createdAt'>;

interface MPPSlice {
  MPPData: ModifiedMPP[];
  setMPPData: (MPPData: ModifiedMPP[]) => void;
  selectedMonth: string;
  setSelectedMonth: (selectedMonth: string) => void;
}

const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'short' });

const createMPPSlice: StateCreator<MPPSlice> = (set) => ({
  MPPData: [],
  setMPPData: (MPPData) => set(() => ({ MPPData })),
  selectedMonth: currentMonth,
  setSelectedMonth: (selectedMonth) => set(() => ({ selectedMonth })),
});

export default createMPPSlice;
