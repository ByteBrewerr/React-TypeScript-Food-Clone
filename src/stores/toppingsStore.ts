import { create } from "zustand";
import { Product } from "../types/productType";
import { Topping } from "../types/toppingType";

type ToppingsStore = {
  product: Product | null;
  productCount: number;
  pickedToppings: Topping[];
  totalPrice: number;
  setProduct: (product: Product) => void;
  setTopping: (topping: Topping) => void;
  removeTopping: (topping: Topping) => void;
  increaseCount: () => void;
  decreaseCount: () => void;
  resetState: () => void;
};

const useToppingsStore = create<ToppingsStore>((set) => ({
  product: null,
  productCount: 1,
  pickedToppings: [],
  totalPrice: 0,
  setProduct: (product) => set({ product }),
  setTopping: (topping) =>
    set((state) => {
      const isToppingAlreadyPicked = state.pickedToppings.some((pickedTopping) => pickedTopping.name === topping.name);

      if (!isToppingAlreadyPicked) {
        return {
          pickedToppings: [...state.pickedToppings, topping],
        };
      }

      return state;
    }),

  removeTopping: (topping) =>
    set((state) => {
      const filteredToppings = state.pickedToppings.filter((stateTopping) => stateTopping.name !== topping.name);
      return {
        pickedToppings: [...filteredToppings],
      };
    }),

  increaseCount: () => set((state) => ({ productCount: state.productCount + 1 })),
  decreaseCount: () => set((state) => ({ productCount: Math.max(state.productCount - 1, 1) })),
  resetState: () => set({ product: null, productCount: 1, pickedToppings: [], totalPrice: 0 }),
}));

useToppingsStore.subscribe((state) => {
  const pickedToppings = state.pickedToppings;
  const product = state.product;
  const productCount = state.productCount;
  const totalPrice = calculateTotalPrice(product, pickedToppings, productCount);

  if (state.totalPrice !== totalPrice) {
    useToppingsStore.setState({ totalPrice });
  }
});

const calculateTotalPrice = (product: Product | null, toppings: Topping[], productCount: number): number => {
  if (product) {
    const toppingsPrice = toppings.reduce((acc, topping) => acc + parseFloat(topping.price), 0);

    return (product.price + toppingsPrice) * productCount;
  }

  return 0;
};

export default useToppingsStore;
