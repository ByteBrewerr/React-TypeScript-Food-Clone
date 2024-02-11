import { create } from "zustand";
import { ExtendedProduct } from "../types/productType";

interface CartStore {
  products: ExtendedProduct[];
  totalPrice: number;
  addProduct: (product: ExtendedProduct) => void;
  increaseProductCount: (productName: string) => void;
  decreaseProductCount: (productName: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
  products: [],
  totalPrice: 0,
  addProduct: (product) =>
    set((state) => {
      return { products: [...state.products, product] };
    }),
  increaseProductCount: (productName) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.name === productName ? { ...product, count: product.count + 1 } : product
      );
      return { products: updatedProducts };
    }),
  decreaseProductCount: (productName) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.name === productName && product.count > 0 ? { ...product, count: product.count - 1 } : product
      );
      return { products: updatedProducts };
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
    totalPrice += product.priceWithToppings * product.count;
  });

  return totalPrice;
};

export default useCartStore;
