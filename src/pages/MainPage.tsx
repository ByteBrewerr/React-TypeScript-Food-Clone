import React, { FC } from "react";
import PagesNavigation from "../components/PagesNavigation/PagesNavigation";
import NewProducts from "../components/NewProducts/NewProducts";
import DeliveryInfo from "../components/DeliveryInfo/DeliveryInfo";
import FoodSection from "../components/FoodSection/FoodSection";
import Footer from "../components/Footer/Footer";

const MainPage: FC = () => {
  return (
    <div className="container">
      <PagesNavigation />
      <NewProducts />
      <DeliveryInfo />
      <FoodSection />
      <Footer />
    </div>
  );
};

export default MainPage;
