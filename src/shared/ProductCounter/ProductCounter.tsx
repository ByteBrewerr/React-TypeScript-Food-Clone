import React, { FC } from "react";
import QuantityButton, { QuantityButtonType } from "../QuantityButton/QuantityButton";
import "./productCounter.scss";

type ProductCounterProps = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

const ProductCounter: FC<ProductCounterProps> = ({ count, increase, decrease }) => {
  return (
    <div className="productCounter">
      <QuantityButton type={QuantityButtonType.DECREASE} onClick={decrease} />
      <span>{count}</span>
      <QuantityButton type={QuantityButtonType.INCREASE} onClick={increase} />
    </div>
  );
};

export default ProductCounter;
