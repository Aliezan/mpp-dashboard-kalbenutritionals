import { StateCreator } from 'zustand';

interface CategorySlice {
    selectedCategory: string;
    setSelectedCategory: (selectedCategory: string) => void;
}

const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
    selectedCategory: '',
    setSelectedCategory: (selectedCategory) => set(() => ({ selectedCategory })),
});

export default createCategorySlice;
