import { create } from "zustand";
import { Product } from "../components/FoodSection/FoodDisplay/FoodDisplay";

interface ProductsStore {
  products: Product[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: Product[]) => void;
}

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setProducts: (products) => set({ products }),
}));

export default useProductsStore;
