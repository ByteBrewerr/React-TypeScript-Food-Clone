import React, { FC, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import "./pagesNavigation.scss";
import { usePopUp } from "../../hooks/usePopUp";
import ReactDOM from "react-dom";
import CartButton from "./CartButton/CartPopup";
import useCartStore from "../../stores/cartStore";

const PagesNavigation: FC = () => {
  const [active, setActive] = useState(0);
  const navText = ["Главная", "Акции", "Отзывы"];
  const totalPrice = useCartStore((state) => state.totalPrice);
  const { isPopUpVisible, handlePopUp } = usePopUp();

  const portalContainer = document.getElementById("portal-container");
  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <div className="pagesNavContainer">
      <nav className="navigation">
        {navText.map((text, index) => {
          return (
            <span
              className={index === active ? "navigation__button--active" : "navigation__button"}
              onClick={() => setActive(index)}
              key={index}
            >
              {text}
            </span>
          );
        })}
      </nav>

      <div className="relativeDivCartButton">
        <button className="cartButton" onClick={handlePopUp}>
          <BsCart4 size={15} />
          <span>{totalPrice} ₽</span>
        </button>
        {isPopUpVisible && <CartButton closePopup={handlePopUp} />}
      </div>
    </div>
  );
};

export default PagesNavigation;
