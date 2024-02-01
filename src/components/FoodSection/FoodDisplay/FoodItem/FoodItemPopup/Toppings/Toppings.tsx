import React from "react";
import useProductsStore from "../../../../../../stores/productsStore";
import Topping from "./Topping/Topping";
import "./toppings.scss";

const Toppings = () => {
  const { toppings } = useProductsStore();
  return (
    <div className="toppingsContainer">
      {toppings.map((topping) => {
        return <Topping name={topping.name} price={topping.price} />;
      })}
    </div>
  );
};
export default Toppings;
