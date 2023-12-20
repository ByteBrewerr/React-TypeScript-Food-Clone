import React, { FC } from "react";
import Header from "../components/Header";
import PagesNavigation from "../components/PagesNavigation";
import NewProducts from "../components/NewProducts";
import DeliveryInfo from "../components/DeliveryInfo";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <PagesNavigation />
        <NewProducts />
        <DeliveryInfo />
      </div>
    </>
  );
};

export default MainPage;
