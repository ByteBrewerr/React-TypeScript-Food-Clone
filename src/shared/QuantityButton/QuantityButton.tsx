import React, { FC } from "react";
import "./quantityButton.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export enum ButtonType {
  INCREASE = "+",
  DECREASE = "-",
}

type QuantityButtonProps = {
  type: ButtonType;
  onClick: () => void;
};

const QuantityButton: FC<QuantityButtonProps> = ({ type, onClick }) => {
  return (
    <button className="quantityButton" onClick={() => onClick()}>
      {type === ButtonType.INCREASE ? <FaPlus /> : <FaMinus />}
    </button>
  );
};

export default QuantityButton;
