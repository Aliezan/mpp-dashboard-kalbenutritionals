import { create } from 'zustand';
import { SidebarSlice } from './slices/Sidebar';

export type StateFromFunctions<T extends [...any]> = T extends [
  infer F,
  ...infer R,
]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type Store = StateFromFunctions<[typeof SidebarSlice]>;

const useStore = create<Store>()((...a) => ({
  ...SidebarSlice(...a),
}));

export default useStore;
