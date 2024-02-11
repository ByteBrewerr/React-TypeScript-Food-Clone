import { Topping } from "./toppingType";

export type Product = {
  img: string;
  description: string;
  id: string;
  isPopular: boolean;
  name: string;
  price: number;
  type: string;
};

export type ExtendedProduct = Product & {
  count: number;
  toppings: Topping[];
  priceWithToppings: number;
};
