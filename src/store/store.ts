import { create } from 'zustand';
import createSidebarSlice from './slices/Sidebar/SidebarSlice';
import createMPPSlice from './slices/Sidebar/MPPSlice';
import createCategorySlice from './slices/Category/CategorySlice';

export type StateFromFunctions<T extends [...any]> = T extends [
  infer F,
  ...infer R,
]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type Store = StateFromFunctions<
  [typeof createSidebarSlice, typeof createMPPSlice, typeof createCategorySlice]
>;

const useStore = create<Store>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createMPPSlice(...a),
  ...createCategorySlice(...a),
}));

export default useStore;
