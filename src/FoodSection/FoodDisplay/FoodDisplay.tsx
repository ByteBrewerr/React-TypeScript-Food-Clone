import React from "react";
import FoodItem from "./FoodItem/FoodItem";
import img from "../../assets/newProducts.jpg";
import useProductsStore from "../../stores/productsStore";
import "./foodDisplay.scss";

export type Product = {
  img: typeof img;
  description: string;
  id: string;
  isPopular: boolean;
  name: string;
  price: number;
  type: string;
};

export const FoodDisplay = () => {
  const { products } = useProductsStore();
  return (
    <div className="foodDisplay">
      {products.map((product) => {
        return <FoodItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default FoodDisplay;
