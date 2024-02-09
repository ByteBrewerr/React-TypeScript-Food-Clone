import React, { FC } from "react";
import { Product } from "../../../../types/productType";
import { usePopUp } from "../../../../hooks/usePopUp";
import FoodItemPopup from "./FoodItemPopup/FoodItemPopup";
import ReactDOM from "react-dom";
import "./foodItem.scss";
import Overlay from "../../../../shared/modals/Overlay/Overlay";
import useToppingsStore from "../../../../stores/toppingsStore";

const FoodItem: FC<{ product: Product }> = ({ product }) => {
  const { isPopUpVisible, handlePopUp } = usePopUp();
  const setProduct = useToppingsStore((state) => state.setProduct);
  const resetToppingsState = useToppingsStore((state) => state.resetState);
  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  const handleCloseToppings = () => {
    handlePopUp();
    resetToppingsState();
  };

  const handleOpenToppings = () => {
    handlePopUp();
    setProduct(product);
  };

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
          {product.type === "Бургеры" && <button onClick={() => handleOpenToppings()}>Опции</button>}
        </div>

        <div className="foodItem__priceAndCartButton">
          <h2>{product.price} ₽</h2>
          <button>В КОРЗИНУ</button>
        </div>
      </div>

      {isPopUpVisible && (
        <>
          {ReactDOM.createPortal(<Overlay handlePopup={handleCloseToppings} />, portalContainer)}
          {ReactDOM.createPortal(<FoodItemPopup onClose={handleCloseToppings} product={product} />, portalContainer)}
        </>
      )}
    </>
  );
};

export default FoodItem;
