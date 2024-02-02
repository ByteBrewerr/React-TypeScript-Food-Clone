// useToppingsStore.ts
import { create } from "zustand";
import { Product } from "../components/FoodSection/FoodDisplay/FoodDisplay";
import produce from "immer";

type ToppingsStore = {
  product: Product | null;
  productCount: number;
  pickedToppings: { name: string; price: string }[];
  totalPrice: number;
  setProduct: (product: Product) => void;
  setPickedToppings: (topping: { name: string; price: string }) => void;
  increaseCount: () => void;
  decreaseCount: () => void;
};

const useToppingsStore = create<ToppingsStore>((set) => ({
  product: null,
  productCount: 1,
  pickedToppings: [],
  totalPrice: 0,
  setProduct: (product) => set({ product }),
  setPickedToppings: (topping) =>
    set((state) => {
      const isToppingAlreadyPicked = state.pickedToppings.some((pickedTopping) => pickedTopping.name === topping.name);

      if (!isToppingAlreadyPicked) {
        return {
          pickedToppings: [...state.pickedToppings, topping],
        };
      }

      return state;
    }),

  increaseCount: () => set((state) => ({ productCount: state.productCount + 1 })),
  decreaseCount: () => set((state) => ({ productCount: Math.max(state.productCount - 1, 1) })),
}));

export default useToppingsStore;
