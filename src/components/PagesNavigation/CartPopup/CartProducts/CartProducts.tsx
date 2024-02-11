import React, { FC } from "react";
import { ExtendedProduct } from "../../../../types/productType";
import "./cartProducts.scss";
import CartProduct from "./CartProduct/CartProduct";

type CartProductsProps = {
  products: ExtendedProduct[];
};

const CartProducts: FC<CartProductsProps> = ({ products }) => {
  return (
    <div className="cartProducts">
      {products.map((product) => {
        return <CartProduct product={product} />;
      })}
    </div>
  );
};

export default CartProducts;
