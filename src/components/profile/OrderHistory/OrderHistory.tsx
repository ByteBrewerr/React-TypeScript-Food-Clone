import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect } from "react";
import orderStore from "../../../stores/ordersStore";
import { observer } from "mobx-react-lite";
import "./orderHistory.scss";
import SingleOrder from "./SingleOrder/SingleOrder";
import ClipLoader from "react-spinners/ClipLoader";

const OrderHistory = () => {
  const { orders, loading, setOrders, setLoading } = orderStore;

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const database = getDatabase();
        const userOrdersRef = ref(database, `users/${storedUid}/orders`);
        onValue(userOrdersRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            setOrders(data);
          }
          setLoading(false);
        });
      } catch (error) {
        console.log("Ошибка загрузки истории заказов", error);
        setLoading(false);
      }
    };

    if (!loading && orders.length === 0) {
      fetchOrders();
    }
  }, [loading, orders, setOrders, setLoading]);

  return (
    <div className="orderHistory">
      <h1>История заказов</h1>
      {loading && <ClipLoader />}
      {!loading && orders.length > 0 && (
        <div className="orderHistoryContent">
          {orders.map((order) => (
            <SingleOrder key={order.number} number={order.number} date={order.date} address={order.address} />
          ))}
        </div>
      )}
      {!loading && orders.length === 0 && <h3>У вас нет заказов</h3>}
    </div>
  );
};

export default observer(OrderHistory);
