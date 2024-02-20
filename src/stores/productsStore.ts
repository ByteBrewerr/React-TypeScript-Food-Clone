import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { Product } from "../types/productType";

class ProductsStore {
  products: Product[] = [];
  toppings: { name: string; price: string }[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setProducts = (products: Product[]) => {
    this.products = products;
  };

  setToppings = async () => {
    try {
      const response = await fetch("../../public/toppings.json");
      const jsonData = await response.json();

      runInAction(() => {
        this.toppings = jsonData;
      });
    } catch (error) {
      console.error("Error loading toppings:", error);
    }
  };
}

const productsStore = new ProductsStore();
export default productsStore;
