import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketStorage {
  basketIds: string[];
  addToBasket: (id: string) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  isInBasket: (id: string) => boolean;
}

export const useBasketStorage = create<BasketStorage>()(
  persist(
    (set, get) => ({
      basketIds: [],
      addToBasket: (id) =>
        set((state) => ({
          basketIds: state.basketIds.includes(id)
            ? state.basketIds
            : [...state.basketIds, id],
        })),
      removeFromBasket: (id) =>
        set((state) => ({
          basketIds: state.basketIds.filter((basketId) => basketId !== id),
        })),
      clearBasket: () => set({ basketIds: [] }),
      isInBasket: (id) => get().basketIds.includes(id),
    }),
    { name: "basket-storage" }
  )
);
