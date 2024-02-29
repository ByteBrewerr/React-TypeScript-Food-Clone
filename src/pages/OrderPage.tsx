import React from "react";
import PagesNavigation from "../components/PagesNavigation/PagesNavigation";
import ContactInfo from "../components/makeOrder/ContactInfo/ContactInfo";

const OrderPage = () => {
  return (
    <div className="container">
      <PagesNavigation />
      <h2>Оформление заказа</h2>
      <ContactInfo />
    </div>
  );
};

export default OrderPage;
