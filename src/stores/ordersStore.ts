import { makeAutoObservable } from "mobx";
import { OrderType } from "../types/orderType";

class OrderStore {
  orders: OrderType[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOrders = (orders: OrderType[]) => {
    this.orders = orders;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}

const orderStore = new OrderStore();

export default orderStore;
