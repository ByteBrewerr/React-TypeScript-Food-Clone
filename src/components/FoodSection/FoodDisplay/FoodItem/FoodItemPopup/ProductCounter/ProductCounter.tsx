import React, { useState } from "react";
import QuantityButton, { ButtonType } from "../../../../../../shared/QuantityButton/QuantityButton";
import "./productCounter.scss";

const ProductCounter = () => {
  const [productCount, setProductCount] = useState(0);

  const increaseCount = () => {
    setProductCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setProductCount((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="productCounter">
      <QuantityButton type={ButtonType.DECREASE} onClick={decreaseCount} />
      <span>{productCount}</span>
      <QuantityButton type={ButtonType.INCREASE} onClick={increaseCount} />
    </div>
  );
};

export default ProductCounter;
