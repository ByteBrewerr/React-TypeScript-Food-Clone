import React, { FC } from "react";
import "./quantityButton.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

export enum QuantityButtonType {
  INCREASE,
  DECREASE,
}

type QuantityButtonProps = {
  type: QuantityButtonType;
  onClick: () => void;
};

const QuantityButton: FC<QuantityButtonProps> = ({ type, onClick }) => {
  return (
    <button className="quantityButton" onClick={() => onClick()}>
      {type === QuantityButtonType.INCREASE ? <FaPlus /> : <FaMinus />}
    </button>
  );
};

export default QuantityButton;
