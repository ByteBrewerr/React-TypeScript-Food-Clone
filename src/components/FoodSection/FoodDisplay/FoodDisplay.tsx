import React from "react";
import FoodItem from "./FoodItem/FoodItem";
import "./foodDisplay.scss";
import { Skeleton } from "./Skeleton/Skeleton";
import { observer } from "mobx-react-lite";
import productsStore from "../../../stores/productsStore";

const FoodDisplay = () => {
  const { products, isLoading } = productsStore;
  return (
    <div className="foodDisplay">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)
        : products.map((product) => <FoodItem key={product.id} product={product} />)}
    </div>
  );
};

export default observer(FoodDisplay);
