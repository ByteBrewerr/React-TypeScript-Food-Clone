import React, { FC } from "react";
import Header from "../components/Header/Header";
import PagesNavigation from "../components/PagesNavigation/PagesNavigation";
import NewProducts from "../components/NewProducts/NewProducts";
import DeliveryInfo from "../components/DeliveryInfo/DeliveryInfo";
import FoodNavigation from "../components/FoodNavigation/FoodNavigation";
import FoodDisplay from "../components/FoodDisplay/FoodItem";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <PagesNavigation />
        <NewProducts />
        <DeliveryInfo />
        <FoodNavigation />
        <FoodDisplay />
      </div>
    </>
  );
};

export default MainPage;
