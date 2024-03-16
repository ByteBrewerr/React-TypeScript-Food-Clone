import { FC, useLayoutEffect } from "react";
import "./cartPopup.scss";
import CartProducts from "./CartProducts/CartProducts";
import OrderInfo from "./OrderInfo/OrderInfo";
import cartStore from "../../../stores/cartStore";
import { observer } from "mobx-react-lite";

type CartPopupProps = {
  closePopup: () => void;
};

const CartPopup: FC<CartPopupProps> = ({ closePopup }) => {
  const { products: cartProducts } = cartStore;

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
export default observer(CartPopup);
