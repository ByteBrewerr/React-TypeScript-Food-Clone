import React, { FC } from "react";
import { Product } from "../FoodItem";
import "./foodItem.scss";

const FoodItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="foodItem">
      <img src={product.img} alt="foodImage" />

      <div className="foodItem__info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div className="foodItem__sizeAndOptions">
        <h3>1 шт.</h3>
        <button>Опции</button>
      </div>

      <div className="foodItem__priceAndCartButton">
        <h2>{product.price} ₽</h2>
        <button>В КОРЗИНУ</button>
      </div>
    </div>
  );
};

export default FoodItem;
