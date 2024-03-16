import { useEffect } from "react";
import orderStore from "../../../stores/ordersStore";
import { observer } from "mobx-react-lite";
import "./orderHistory.scss";
import SingleOrder from "./SingleOrder/SingleOrder";

const OrderHistory = () => {
  const { orders, fetchOrders, isLoading } = orderStore;

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (orders.length === 0 && storedUid) {
      fetchOrders(storedUid);
    }
  }, [orders]);

  return (
    <div className="orderHistory">
      {orders.length > 0 && (
        <div className="orderHistoryContent">
          {orders.map((order) => (
            <SingleOrder key={order.number} number={order.number} date={order.date} address={order.address} />
          ))}
        </div>
      )}
      {!isLoading && orders.length === 0 && <h3>У вас нет заказов</h3>}
    </div>
  );
};

export default observer(OrderHistory);
