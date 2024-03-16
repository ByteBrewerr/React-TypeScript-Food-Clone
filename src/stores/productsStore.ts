import { makeAutoObservable, runInAction } from "mobx";
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
    this.toppings = data;
  };
}

const productsStore = new ProductsStore();
export default productsStore;

var data = [
  {
    name: "Котлета 45 гр.",
    price: "55",
  },
  {
    name: "Котлета 90 гр.",
    price: "95",
  },
  {
    name: "Котлета 110 гр.",
    price: "115",
  },
  {
    name: "Котлета 150 гр.",
    price: "155",
  },
  {
    name: "Жареный бекон",
    price: "35",
  },
  {
    name: "Сыр Моцарелла",
    price: "35",
  },
  {
    name: "Вяленый томат",
    price: "35",
  },
  {
    name: "Сыр Дорблю",
    price: "35",
  },
  {
    name: "Салат Айсберг",
    price: "35",
  },
  {
    name: "Жареные шампиньоны",
    price: "35",
  },
  {
    name: "Жареное яйцо",
    price: "35",
  },
  {
    name: "Перец Халапеньо",
    price: "25",
  },
  {
    name: "Маринованный Лук",
    price: "25",
  },
  {
    name: "Маринованные Огурчики",
    price: "25",
  },
  {
    name: "Помидор",
    price: "25",
  },
  {
    name: "Хрустящий Лук Фри",
    price: "25",
  },
  {
    name: "Соус Красный Лесоруб",
    price: "40",
  },
  {
    name: "Соус Кимрский пацан",
    price: "40",
  },
  {
    name: "Соус Сытый папа",
    price: "40",
  },
  {
    name: "Соус Взрослый дядя",
    price: "40",
  },
  {
    name: "Сырная котлета",
    price: "70",
  },
  {
    name: "Сыр Чеддер",
    price: "35",
  },
  {
    name: "Сыр Эмменталь",
    price: "35",
  },
];
