// Topping.tsx
import React, { FC, useState } from "react";
import "./topping.scss";
import CustomCheckbox from "../../../../../../../shared/CustomCheckbox/CustomCheckbox";
import useToppingsStore from "../../../../../../../stores/toppingsStore";
import { useShallow } from "zustand/react/shallow";

type ToppingProps = {
  name: string;
  price: string;
};

const Topping: FC<ToppingProps> = ({ name, price }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { setTopping, removeTopping } = useToppingsStore(
    useShallow((state) => ({
      setTopping: state.setTopping,
      removeTopping: state.removeTopping,
    }))
  );

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
export default Topping;
