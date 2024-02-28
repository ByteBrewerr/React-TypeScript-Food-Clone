import { observable, action, makeAutoObservable, runInAction, get } from "mobx";
import { Product } from "../types/productType";
import { getDatabase, onValue, ref, update } from "firebase/database";
import notify from "../utils/notify";

class ProductsStore {
  products: Product[] = [];
  toppings: { name: string; price: string }[] = [];
  favouriteProducts: Product[] = [];
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

  addFavouriteProduct = async (product: Product, uid: string) => {
    if (this.favouriteProducts?.some((item) => item.id === product.id)) return;

    const db = getDatabase();
    const dbRef = ref(db, "/users/" + uid);
    const newData = {
      favouriteProducts: [...this.favouriteProducts, product],
    };
    try {
      await update(dbRef, newData);
      runInAction(() => {
        this.favouriteProducts = [...this.favouriteProducts, product];
      });
    } catch (error) {
      notify("Ошибка, попробуйте позже", "error");
    }
  };

  deleteFavouriteProduct = async (product: Product, uid: string) => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/" + uid);
    const filteredFavProducts = this.favouriteProducts.filter((item) => product.id !== item.id);
    const newData = {
      favouriteProducts: [...filteredFavProducts],
    };
    try {
      await update(dbRef, newData);
      runInAction(() => {
        this.favouriteProducts = [...filteredFavProducts];
      });
    } catch (error) {
      notify("Ошибка, попробуйте позже", "error");
    }
  };

  loadFavouriteProducts = async (uid: string) => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/" + uid);

    try {
      onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();
          const { favouriteProducts } = data;
          if (favouriteProducts) {
            runInAction(() => {
              this.favouriteProducts = favouriteProducts;
            });
          }
        },
        {
          onlyOnce: true,
        }
      );
    } catch (error) {
      notify("Ошибка загрузки избранных продуктов", "error");
    }
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
