import React, { FC } from "react";
import "./topping.scss";

type ToppingProps = {
  name: string;
  price: string;
};

const Topping: FC<ToppingProps> = ({ name, price }) => {
  return (
    <div>
      <div className="topping">
        <p className="toppingName">{name}</p>
        <p className="toppingPrice">{price} ₽</p>
      </div>
    </div>
  );
};
export default Topping;
