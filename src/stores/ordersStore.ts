import { makeAutoObservable, runInAction } from "mobx";
import { OrderType } from "../types/orderType";
import { getDatabase, onValue, ref } from "firebase/database";

class OrderStore {
  orders: OrderType[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchOrders = async (uid: string) => {
    this.isLoading = true;
    try {
      const database = getDatabase();
      const userOrdersRef = ref(database, `users/${uid}/orders`);
      onValue(userOrdersRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          const arrayData = Object.values(data) as OrderType[];
          runInAction(() => {
            this.orders = arrayData;
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.log("Ошибка загрузки истории заказов", error);
    }
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
}

const orderStore = new OrderStore();

export default orderStore;
