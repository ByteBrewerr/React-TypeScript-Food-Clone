import { create } from "zustand";
import { Product } from "../types/productType";

interface ProductsStore {
  products: Product[];
  toppings: { name: string; price: string }[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: Product[]) => void;
  setToppings: () => Promise<void>;
}

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  toppings: [],
  setToppings: async () => {
    try {
      const response = await fetch("../../public/toppings.json");
      const jsonData = await response.json();
      set({ toppings: jsonData });
    } catch (error) {
      console.error("Error loading toppings:", error);
    }
  },
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setProducts: (products) => set({ products }),
}));

export default useProductsStore;
