import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Categories {
  categoryId: string;
  name: string;
}

export interface CategoriesStorage {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
  addCategory: (name: string) => void;
  removeCategory: (categoryId: string) => void;
  editCategory: ({ categoryId, name }: Categories) => void;
}

export const useCategoriesStorage = create<CategoriesStorage>()(
  persist(
    (set, get) => ({
      categories: [
        // {
        //   categoryId: "1",
        //   name: "Категория 1",
        // },
        // {
        //   categoryId: "2",
        //   name: "Категория 2",
        // },
      ] as Categories[],
      setCategories: (categories) => set({ categories }),
      addCategory: (name) =>
        set((state) => ({
          categories: [...state.categories, { name, categoryId: uuidv4() }],
        })),
      removeCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.categoryId !== categoryId
          ),
        })),
      editCategory: ({ categoryId, name }) =>
        set((state) => ({
          categories: state.categories.map((item) =>
            item.categoryId === categoryId ? { ...item, name } : item
          ),
        })),
    }),
    { name: "categories-storage" }
  )
);
