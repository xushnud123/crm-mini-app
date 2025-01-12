import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Categories } from "./categoriesStorage";

export interface Product {
  category: Categories;
  name: string;
  productId: string;
  description: string;
  photo: { imgUrl: string; name: string };
}

export interface ProductsStorage {
  products: Product[];
  addProduct: (
    e: Pick<Product, "category" | "name" | "description" | "photo">
  ) => void;
  removeProduct: (productId: string) => void;
  editProduct: (e: Product) => void;
}

export const useProductsStorage = create<ProductsStorage>()(
  persist(
    (set) => ({
      products: [] as Product[],
      addProduct: (props) =>
        set((state) => {
          const product = { ...props, productId: uuidv4() };
          return {
            products: [...state.products, product],
          };
        }),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.productId !== productId
          ),
        })),
      editProduct: ({ productId, name, category, description, photo }) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.productId === productId
              ? { ...item, name, category, description, photo, productId }
              : item
          ),
        })),
    }),
    { name: "product-storage" }
  )
);
