import { computed, makeAutoObservable } from "mobx";
import { ExtendedProduct } from "../types/productType";
import notify from "../services/notificationService";

class CartStore {
  products: ExtendedProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get totalPrice() {
    let totalPrice = 0;

    this.products.forEach((product) => {
      totalPrice += product.priceWithToppings * product.count;
    });

    return totalPrice;
  }

  addProduct = (product: ExtendedProduct, countToAdd: number = 1) => {
    notify("Товар успешно добавлен", "success");
    const existingProductIndex = this.products.findIndex(
      (existingProduct) =>
        existingProduct.name === product.name && JSON.stringify(existingProduct.toppings) === JSON.stringify(product.toppings)
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...this.products];
      updatedProducts[existingProductIndex] = {
        ...updatedProducts[existingProductIndex],
        count: updatedProducts[existingProductIndex].count + countToAdd,
      };
      this.products = updatedProducts;
    } else {
      this.products = [...this.products, { ...product, count: countToAdd }];
    }
  };

  increaseProductCount = (product: ExtendedProduct) => {
    const updatedProducts = this.products.map((existingProduct) =>
      existingProduct.name === product.name && JSON.stringify(existingProduct.toppings) === JSON.stringify(product.toppings)
        ? { ...existingProduct, count: existingProduct.count + 1 }
        : existingProduct
    );
    this.products = updatedProducts;
  };

  decreaseProductCount = (product: ExtendedProduct) => {
    const updatedProducts = this.products.map((existingProduct) =>
      existingProduct.name === product.name &&
      product.count > 1 &&
      JSON.stringify(existingProduct.toppings) === JSON.stringify(product.toppings)
        ? { ...existingProduct, count: existingProduct.count - 1 }
        : existingProduct
    );
    this.products = updatedProducts;
  };

  deleteProduct = (product: ExtendedProduct) => {
    const updatedProducts = this.products.filter(
      (existingProduct) =>
        existingProduct.name !== product.name || JSON.stringify(existingProduct.toppings) !== JSON.stringify(product.toppings)
    );
    this.products = updatedProducts;
  };

  calculateTotalPrice = (): number => {
    let totalPrice = 0;

    this.products.forEach((product) => {
      totalPrice += product.priceWithToppings * product.count;
    });

    return totalPrice;
  };
}

const cartStore = new CartStore();

export default cartStore;
