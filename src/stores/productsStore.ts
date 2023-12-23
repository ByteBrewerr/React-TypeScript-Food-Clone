import { create } from "zustand";
import { Product } from "../FoodSection/FoodDisplay/FoodDisplay";

interface ProductsStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

export default useProductsStore;
