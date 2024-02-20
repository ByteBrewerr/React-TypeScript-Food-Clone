import React, { FC, useEffect, useLayoutEffect } from "react";
import "./cartPopup.scss";
import useCartStore from "../../../stores/cartStore";
import CartProducts from "./CartProducts/CartProducts";
import OrderInfo from "./OrderInfo/OrderInfo";

type CartPopupProps = {
  closePopup: () => void;
};

const CartPopup: FC<CartPopupProps> = ({ closePopup }) => {
  const cartProducts = useCartStore((state) => state.products);

  useLayoutEffect(() => {
    if (cartProducts.length === 0) {
      closePopup();
    }
  });

  return (
    <div className="cartPopup">
      <div className="cartPopupHeader">
        <h2>Корзина</h2>
        <button onClick={closePopup}>X</button>
      </div>
      <CartProducts products={cartProducts} />
      <OrderInfo />
    </div>
  );
};
export default CartPopup;
