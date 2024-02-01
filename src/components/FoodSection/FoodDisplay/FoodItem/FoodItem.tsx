import React, { FC } from "react";
import { Product } from "../FoodDisplay";
import { usePopUp } from "../../../../hooks/usePopUp";
import FoodItemPopup from "../../../../shared/modals/FoodItem/FoodItemPopup";
import ReactDOM from "react-dom";
import "./foodItem.scss";
import Overlay from "../../../../shared/modals/Overlay/Overlay";

const FoodItem: FC<{ product: Product }> = ({ product }) => {
  const { isPopUpVisible, handlePopUp } = usePopUp();

  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <>
      <div className="foodItem">
        <img src={product.img} alt="foodImage" />

        <div className="foodItem__info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div className="foodItem__sizeAndOptions">
          <h3>1 шт.</h3>
          {product.type === "Бургеры" && <button onClick={() => handlePopUp()}>Опции</button>}
        </div>

        <div className="foodItem__priceAndCartButton">
          <h2>{product.price} ₽</h2>
          <button>В КОРЗИНУ</button>
        </div>
      </div>

      {isPopUpVisible && (
        <>
          {ReactDOM.createPortal(<Overlay handlePopup={handlePopUp} />, portalContainer)}
          {ReactDOM.createPortal(<FoodItemPopup onClose={handlePopUp} product={product} />, portalContainer)}
        </>
      )}
    </>
  );
};

export default FoodItem;
