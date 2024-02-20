import React, { useEffect } from "react";
import useProductsStore from "../../../../../../stores/productsStore";
import Topping from "./Topping/Topping";
import "./toppings.scss";
import productsStore from "../../../../../../stores/productsStore";
import { observer } from "mobx-react-lite";

const Toppings = () => {
  const { toppings, setToppings } = productsStore;
  useEffect(() => {
    setToppings();
  }, []);
  return (
    <>
      <div className="toppingsContainer">
        {toppings.map((topping) => {
          return <Topping key={topping.name} name={topping.name} price={topping.price} />;
        })}
      </div>
    </>
  );
};
export default observer(Toppings);
