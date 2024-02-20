// Topping.tsx
import React, { FC, useState } from "react";
import "./topping.scss";
import CustomCheckbox from "../../../../../../../shared/CustomCheckbox/CustomCheckbox";
import useToppingsStore from "../../../../../../../stores/toppingsStore";
import { useShallow } from "zustand/react/shallow";
import toppingsStore from "../../../../../../../stores/toppingsStore";
import { observer } from "mobx-react-lite";

type ToppingProps = {
  name: string;
  price: string;
};

const Topping: FC<ToppingProps> = ({ name, price }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { setTopping, removeTopping } = toppingsStore;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setTopping({ name, price });
    }

    if (isChecked) {
      removeTopping({ name, price });
    }
  };

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
export default observer(Topping);
