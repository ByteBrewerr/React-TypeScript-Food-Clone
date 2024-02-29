import React, { FC } from "react";
import { Product } from "../../../../types/productType";
import { usePopUp } from "../../../../hooks/usePopUp";
import FoodItemPopup from "./FoodItemPopup/FoodItemPopup";
import ReactDOM from "react-dom";
import "./foodItem.scss";
import Overlay from "../../../../shared/modals/Overlay/Overlay";
import toppingsStore from "../../../../stores/toppingsStore";
import { observer } from "mobx-react-lite";
import cartStore from "../../../../stores/cartStore";
import { MdFavorite } from "react-icons/md";
import useFavoriteProduct from "../../../../hooks/useFavoriteProduct";
import userStore from "../../../../stores/userStore";

const FoodItem: FC<{ product: Product }> = ({ product }) => {
  const { isPopUpVisible, handlePopUp } = usePopUp();
  const { setProduct, resetState: resetToppingsState } = toppingsStore;
  const { isAuth } = userStore;
  const { addProduct } = cartStore;

  const { isFavourite, handleFavourites } = useFavoriteProduct(product);

  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  const handleAddToCart = () => {
    const extendedProduct = { ...product, count: 1, priceWithToppings: product.price, toppings: [] };
    addProduct(extendedProduct, 1);
  };

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
        {isAuth && (
          <button className="foodItemFavouritesBtn" onClick={handleFavourites}>
            <MdFavorite size={30} color={`${isFavourite ? "#ff0000" : "#800000"}`} />
          </button>
        )}

        <img src={product.img} alt="foodImage" />

        <div className="foodItem__info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div className="foodItem__sizeAndOptions">
          <h3>1 шт.</h3>
          {product.type === "Бургеры" && <button onClick={handleOpenToppings}>Опции</button>}
        </div>

        <div className="foodItem__priceAndCartButton">
          <h2>{product.price} ₽</h2>
          <button onClick={handleAddToCart}>В КОРЗИНУ</button>
        </div>
      </div>

      {isPopUpVisible && (
        <>
          {ReactDOM.createPortal(
            <Overlay handlePopup={handleCloseToppings}>
              <FoodItemPopup onClose={handleCloseToppings} product={product} />
            </Overlay>,
            portalContainer
          )}
        </>
      )}
    </>
  );
};

export default observer(FoodItem);
