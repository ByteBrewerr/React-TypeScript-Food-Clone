import React, { useEffect } from "react";
import useProductsStore from "../../../../../../stores/productsStore";
import Topping from "./Topping/Topping";
import "./toppings.scss";

const Toppings = () => {
  const { toppings, setToppings } = useProductsStore((state) => ({ toppings: state.toppings, setToppings: state.setToppings }));

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        await setToppings();
      } catch (error) {
        console.error("Error loading toppings:", error);
      }
    };

    fetchToppings();
  }, []);
  console.log(2);
  return (
    <div className="toppingsContainer">
      {toppings.map((topping) => {
        return <Topping key={topping.name} name={topping.name} price={topping.price} />;
      })}
    </div>
  );
};
export default Toppings;
