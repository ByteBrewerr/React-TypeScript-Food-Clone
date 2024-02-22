import { makeAutoObservable } from "mobx";
import { ExtendedProduct } from "../types/productType";

import { areArraysEqual } from "../utils/areArraysEqual";
import notify from "../utils/notify";

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
    const existingProductIndex = this.products.findIndex(
      (existingProduct) =>
        existingProduct.name === product.name &&
        areArraysEqual(existingProduct.toppings, product.toppings, (a, b) => a.name.localeCompare(b.name))
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
    notify("Товар успешно добавлен", "success");
  };

  increaseProductCount = (product: ExtendedProduct) => {
    const updatedProducts = this.products.map((existingProduct) =>
      existingProduct.name === product.name &&
      areArraysEqual(existingProduct.toppings, product.toppings, (a, b) => a.name.localeCompare(b.name))
        ? { ...existingProduct, count: existingProduct.count + 1 }
        : existingProduct
    );
    this.products = updatedProducts;
  };

  decreaseProductCount = (product: ExtendedProduct) => {
    const updatedProducts = this.products.map((existingProduct) =>
      existingProduct.name === product.name &&
      product.count > 1 &&
      areArraysEqual(existingProduct.toppings, product.toppings, (a, b) => a.name.localeCompare(b.name))
        ? { ...existingProduct, count: existingProduct.count - 1 }
        : existingProduct
    );
    this.products = updatedProducts;
  };

  deleteProduct = (product: ExtendedProduct) => {
    const updatedProducts = this.products.filter(
      (existingProduct) =>
        existingProduct.name !== product.name ||
        !areArraysEqual(existingProduct.toppings, product.toppings, (a, b) => a.name.localeCompare(b.name))
    );
    this.products = updatedProducts;
  };
}

const cartStore = new CartStore();

export default cartStore;
