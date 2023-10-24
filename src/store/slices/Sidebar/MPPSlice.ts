import { MPP } from '@prisma/client';
import { StateCreator } from 'zustand';

type ModifiedMPP = Omit<MPP, 'userId' | 'id' | 'isApproved' | 'createdAt'>;
type MPPGap = Omit<
  MPP,
  'userId' | 'id' | 'isApproved' | 'Employee_Name' | 'Employee_ID' | 'Join_Date' | 'createdAt'
>;
interface MPPSlice {
  MPPData: ModifiedMPP[];
  setMPPData: (MPPData: ModifiedMPP[]) => void;
  selectedMonth: string;
  setSelectedMonth: (selectedMonth: string) => void;
  MPPGapData: MPPGap[];
  setMPPGapData: (MPPGapData: MPPGap[]) => void;
}

const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'short' });

const createMPPSlice: StateCreator<MPPSlice> = (set) => ({
  MPPData: [],
  MPPGapData: [],
  setMPPData: (MPPData) => set(() => ({ MPPData })),
  selectedMonth: currentMonth,
  setSelectedMonth: (selectedMonth) => set(() => ({ selectedMonth })),
  setMPPGapData: (MPPGapData) => set(() => ({ MPPGapData })),
});

export default createMPPSlice;
