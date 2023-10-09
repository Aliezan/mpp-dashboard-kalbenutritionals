import { StateCreator } from 'zustand';

interface SidebarSlice {
  isExpand: boolean;
  setIsExpand: () => void;
}

const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  isExpand: false,
  setIsExpand: () => set((state) => ({ isExpand: !state.isExpand })),
});

export default createSidebarSlice;
