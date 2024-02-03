import React, { FC } from "react";
import "./FoodItemPopup.scss";
import { Product } from "../../../../../types/productType";
import ProductCounter from "./ProductCounter/ProductCounter";
import Toppings from "./Toppings/Toppings";
import { IoMdClose } from "react-icons/io";
type PopUpProps = {
  onClose: () => void;
  product: Product;
};

const FoodItemPopup: FC<PopUpProps> = ({ product, onClose }) => {
  return (
    <div className="foodItemContainer">
      <div className="foodItemPopup">
        <button className="closeButton" onClick={() => onClose()}>
          <IoMdClose />
        </button>
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
        <h4>Опции</h4>
        <Toppings />
      </div>
    </div>
  );
};
export default FoodItemPopup;
