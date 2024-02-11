import React, { FC } from "react";
import "./FoodItemPopup.scss";
import { Product } from "../../../../../types/productType";
import ProductCounter from "../../../../../shared/ProductCounter/ProductCounter";
import Toppings from "./Toppings/Toppings";
import { IoMdClose } from "react-icons/io";
import useToppingsStore from "../../../../../stores/toppingsStore";
import useCartStore from "../../../../../stores/cartStore";
import { useShallow } from "zustand/react/shallow";

type PopUpProps = {
  onClose: () => void;
  product: Product;
};

const FoodItemPopup: FC<PopUpProps> = ({ product, onClose }) => {
  const addProduct = useCartStore((state) => state.addProduct);

  const { decreaseCount, increaseCount, productCount, toppings, totalPrice } = useToppingsStore(
    useShallow((state) => ({
      decreaseCount: state.decreaseCount,
      increaseCount: state.increaseCount,
      productCount: state.productCount,
      toppings: state.pickedToppings,
      totalPrice: state.totalPrice,
    }))
  );
  const handleAddToCart = () => {
    const extendedProduct = { ...product, count: productCount, priceWithToppings: totalPrice, toppings };
    addProduct(extendedProduct);
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
export default FoodItemPopup;
