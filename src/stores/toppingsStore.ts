import { makeAutoObservable } from "mobx";
import { Product } from "../types/productType";
import { Topping } from "../types/toppingType";

class ToppingsStore {
  product: Product | null = null;
  productCount: number = 1;
  pickedToppings: Topping[] = [];
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setProduct = (product: Product) => {
    this.product = product;
  };

  setTopping = (topping: Topping) => {
    const isToppingAlreadyPicked = this.pickedToppings.some((pickedTopping) => pickedTopping.name === topping.name);

    if (!isToppingAlreadyPicked) {
      this.pickedToppings.push(topping);
    }
  };

  removeTopping = (topping: Topping) => {
    this.pickedToppings = this.pickedToppings.filter((stateTopping) => stateTopping.name !== topping.name);
  };

  increaseCount = () => {
    this.productCount += 1;
  };

  decreaseCount = () => {
    this.productCount = Math.max(this.productCount - 1, 1);
  };

  resetState = () => {
    this.product = null;
    this.productCount = 1;
    this.pickedToppings = [];
    this.totalPrice = 0;
  };

  calculateTotalPrice = (): number => {
    if (this.product) {
      const toppingsPrice = this.pickedToppings.reduce((acc, topping) => acc + parseFloat(topping.price), 0);

      return (this.product.price + toppingsPrice) * this.productCount;
    }

    return 0;
  };

  updateTotalPrice = () => {
    const totalPrice = this.calculateTotalPrice();

    if (this.totalPrice !== totalPrice) {
      this.totalPrice = totalPrice;
    }
  };
}

const toppingsStore = new ToppingsStore();

export default toppingsStore;
