import { create } from 'zustand';
import createSidebarSlice from './slices/Sidebar/SidebarSlice';

export type StateFromFunctions<T extends [...any]> = T extends [
  infer F,
  ...infer R,
]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type Store = StateFromFunctions<[typeof createSidebarSlice]>;

const useStore = create<Store>()((...a) => ({
  ...createSidebarSlice(...a),
}));

export default useStore;
