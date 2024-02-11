import React, { FC } from "react";
import { ExtendedProduct } from "../../../../../types/productType";
import "./cartProduct.scss";
import QuantityButton, { QuantityButtonType } from "../../../../../shared/QuantityButton/QuantityButton";
import ProductCounter from "../../../../../shared/ProductCounter/ProductCounter";
import useCartStore from "../../../../../stores/cartStore";

type CartProductProps = {
  product: ExtendedProduct;
};

const CartProduct: FC<CartProductProps> = ({ product }) => {
  const productCount = product.count;
  const increaseCount = useCartStore((state) => state.increaseProductCount);
  const decreaseCount = useCartStore((state) => state.decreaseProductCount);

  const increase = () => {
    increaseCount(product.name);
  };

  const decrease = () => {
    decreaseCount(product.name);
  };

  return (
    <div className="cartProduct">
      <img className="cartProductImg" src={product.img} alt="" />
      <div className="cartProductInfo">
        <span>{product.name}</span>
        <p>{product.description}</p>
      </div>
      <ProductCounter count={productCount} increase={increase} decrease={decrease} />
    </div>
  );
};
export default CartProduct;
