import { create } from "zustand";
import { ExtendedProduct } from "../types/productType";

interface CartStore {
  products: ExtendedProduct[];
  totalPrice: number;
  addProduct: (product: ExtendedProduct) => void;
}

const useCartStore = create<CartStore>((set) => ({
  products: [],
  totalPrice: 0,
  addProduct: (product) =>
    set((state) => {
      return { products: [...state.products, product] };
    }),
}));

useCartStore.subscribe((state) => {
  const products = state.products;
  const totalPrice = calculateTotalPrice(products);

  if (state.totalPrice !== totalPrice) {
    useCartStore.setState({ totalPrice });
  }
});

const calculateTotalPrice = (products: ExtendedProduct[]): number => {
  let totalPrice = 0;

  products.forEach((product) => {
    totalPrice += product.price * product.count;

    product.toppings.forEach((topping) => {
      totalPrice += parseFloat(topping.price) * product.count;
    });
  });

  return totalPrice;
};

export default useCartStore;
