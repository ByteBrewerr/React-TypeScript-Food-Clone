import React from "react";
import useToppingsStore from "../../../../../../stores/toppingsStore";
import QuantityButton, { ButtonType } from "../../../../../../shared/QuantityButton/QuantityButton";
import { useShallow } from "zustand/react/shallow";
import "./productCounter.scss";

const ProductCounter = () => {
  const { productCount, increaseCount, decreaseCount } = useToppingsStore((state) => ({
    productCount: state.productCount,
    increaseCount: state.increaseCount,
    decreaseCount: state.decreaseCount,
  }));

  return (
    <div className="productCounter">
      <QuantityButton type={ButtonType.DECREASE} onClick={decreaseCount} />
      <span>{productCount}</span>
      <QuantityButton type={ButtonType.INCREASE} onClick={increaseCount} />
    </div>
  );
};

export default ProductCounter;
