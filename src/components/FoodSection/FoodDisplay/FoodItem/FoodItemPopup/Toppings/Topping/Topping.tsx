// Topping.tsx
import React, { FC, useState } from "react";
import "./topping.scss";
import CustomCheckbox from "../../../../../../../shared/CustomCheckbox/CustomCheckbox";
import useToppingsStore from "../../../../../../../stores/toppingsStore";

type ToppingProps = {
  name: string;
  price: string;
};

const Topping: FC<ToppingProps> = ({ name, price }) => {
  const [isChecked, setIsChecked] = useState(false);

  const setPickedTopping = useToppingsStore((state) => state.setPickedToppings);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setPickedTopping({ name, price });
    }

    if (isChecked) {
    }
  };
  console.log(1);
  return (
    <div className="topping">
      <div>
        <p className="toppingName">{name}</p>
        <p className="toppingPrice">{price} ₽</p>
      </div>
      <CustomCheckbox isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
};
export default Topping;
