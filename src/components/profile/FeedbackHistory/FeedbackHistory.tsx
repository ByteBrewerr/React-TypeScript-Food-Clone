import React, { useEffect } from "react";
import orderStore from "../../../stores/ordersStore";
import SingleFeedback from "./SingleFeedback/SingleFeedback";
import Masonry from "@mui/lab/Masonry";
import { observer } from "mobx-react-lite";

const FeedbackHistory: React.FC = () => {
  const { orders, fetchOrders } = orderStore;

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      fetchOrders(storedUid);
    }
  }, []);

  if (!orders) {
    return <span>У вас нет отзывов</span>;
  }

  return (
    <Masonry columns={2} spacing={2}>
      {orders.map((order) => {
        if (!order.feedback) return null;

        return (
          <SingleFeedback
            key={order.number}
            date={order.date}
            name={order.contacts.name}
            comment={order.feedback.comment}
            img={order.feedback.imageUrl ?? null}
            isPositive={order.feedback.isPositive}
          />
        );
      })}
    </Masonry>
  );
};

export default observer(FeedbackHistory);
