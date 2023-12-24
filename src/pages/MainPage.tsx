import React, { FC } from "react";
import Header from "../components/Header/Header";
import PagesNavigation from "../components/PagesNavigation/PagesNavigation";
import NewProducts from "../components/NewProducts/NewProducts";
import DeliveryInfo from "../components/DeliveryInfo/DeliveryInfo";
import FoodSection from "../components/FoodSection/FoodSection";
import PaymentInfo from "../components/PaymentInfo/PaymentInfo";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <PagesNavigation />
        <NewProducts />
        <DeliveryInfo />
        <FoodSection />
        <PaymentInfo />
      </div>
    </>
  );
};

export default MainPage;
