import React, { FC } from "react";
import "./cartPopup.scss";

type CartPopupProps = {
  closePopup: () => void;
};

const CartPopup: FC<CartPopupProps> = ({ closePopup }) => {
  return (
    <div className="cartPopup">
      <div className="cartPopupHeader">
        <h2>Корзина</h2>
        <button onClick={closePopup}>X</button>
      </div>
    </div>
  );
};
export default CartPopup;
