import { create } from 'zustand';
import createSidebarSlice from './slices/Sidebar/SidebarSlice';
import createMPPSlice from './slices/Sidebar/MPPSlice';

export type StateFromFunctions<T extends [...any]> = T extends [
  infer F,
  ...infer R,
]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type Store = StateFromFunctions<
  [typeof createSidebarSlice, typeof createMPPSlice]
>;

const useStore = create<Store>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createMPPSlice(...a),
}));

export default useStore;
