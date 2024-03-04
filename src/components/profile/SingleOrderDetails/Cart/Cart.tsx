import React, { FC } from "react";
import "./cart.scss";
import { ExtendedProduct, Product } from "../../../../types/productType";

type CartProps = {
  products: ExtendedProduct[];
};

const Cart: FC<CartProps> = ({ products }) => {
  const totalPrice = products.reduce((acc, curr) => {
    return curr.priceWithToppings * curr.count + acc;
  }, 0);

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {products.map((product) => {
        return (
          <div className="productsList">
            <img src={product.img} alt="" />
            <span>
              {product.name} - {product.count} шт.
            </span>
            <span>
              {product.count} x {product.priceWithToppings} ₽
            </span>
          </div>
        );
      })}
      <div className="totalPrice">
        <span>Стоимость заказа</span>
        <span>{totalPrice} ₽</span>
      </div>
    </div>
  );
};

export default Cart;
