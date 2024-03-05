import React from "react";
import PagesNavigation from "../components/PagesNavigation/PagesNavigation";
import MakeOrder from "../components/makeOrder/MakeOrder";

const OrderPage = () => {
  return (
    <div className="container">
      <PagesNavigation />
      <h2>Оформление заказа</h2>
      <MakeOrder />
    </div>
  );
};

export default OrderPage;
