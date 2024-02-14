import React, { FC, useEffect } from "react";
import "./cartPopup.scss";
import useCartStore from "../../../stores/cartStore";
import CartProducts from "./CartProducts/CartProducts";

type CartPopupProps = {
  closePopup: () => void;
};

const CartPopup: FC<CartPopupProps> = ({ closePopup }) => {
  const cartProducts = useCartStore((state) => state.products);

  useEffect(() => {
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
    </div>
  );
};
export default CartPopup;
