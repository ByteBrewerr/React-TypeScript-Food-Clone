import React, { FC } from "react";
import "./FoodItemPopup.scss";
import { Product } from "../../../components/FoodSection/FoodDisplay/FoodDisplay";
import ProductCounter from "./ProductCounter/ProductCounter";

type PopUpProps = {
  onClose: () => void;
  product: Product;
};

const FoodItemPopup: FC<PopUpProps> = ({ product }) => {
  return (
    <div className="foodItemContainer">
      <div className="foodItemPopup">
        <img src={product.img} alt="foodImage" />
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <h5>1 шт.</h5>
        <div className="price-quantity-container">
          <div>
            <span>Сумма</span>
            <span>Кол-во</span>
          </div>
          <div>
            <span>{product.price} ₽</span>
            <ProductCounter />
          </div>
        </div>
        <div className="separator"></div>
      </div>
    </div>
  );
};
export default FoodItemPopup;
