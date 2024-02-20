import React, { FC } from "react";
import "./FoodItemPopup.scss";
import { Product } from "../../../../../types/productType";
import ProductCounter from "../../../../../shared/ProductCounter/ProductCounter";
import Toppings from "./Toppings/Toppings";
import { IoMdClose } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import toppingsStore from "../../../../../stores/toppingsStore";
import { observer } from "mobx-react-lite";
import cartStore from "../../../../../stores/cartStore";

type PopUpProps = {
  onClose: () => void;
  product: Product;
};

const FoodItemPopup: FC<PopUpProps> = ({ product, onClose }) => {
  const { addProduct } = cartStore;

  const { decreaseCount, increaseCount, productCount, pickedToppings, totalPrice } = toppingsStore;

  const handleAddToCart = () => {
    let totalToppingPrice = 0;

    totalToppingPrice = pickedToppings.reduce((acc, topping) => acc + parseInt(topping.price), 0);
    const extendedProduct = {
      ...product,
      count: productCount,
      priceWithToppings: totalToppingPrice + product.price,
      toppings: pickedToppings,
    };
    onClose();
    addProduct(extendedProduct, productCount);
  };

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
            <ProductCounter count={productCount} increase={increaseCount} decrease={decreaseCount} />
          </div>
        </div>
        <div className="separator"></div>
        <h4>Опции</h4>
        <Toppings />
        <button className="addToCartBtn" onClick={() => handleAddToCart()}>
          ДОБАВИТЬ ТОВАР НА {totalPrice} ₽
        </button>
      </div>
    </div>
  );
};
export default observer(FoodItemPopup);
