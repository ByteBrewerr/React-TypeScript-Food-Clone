import React, { FC } from "react";
import { ExtendedProduct } from "../../../../../types/productType";
import "./cartProduct.scss";
import { FaTrashCan } from "react-icons/fa6";
import ProductCounter from "../../../../../shared/ProductCounter/ProductCounter";
import useCartStore from "../../../../../stores/cartStore";

type CartProductProps = {
  product: ExtendedProduct;
};

const CartProduct: FC<CartProductProps> = ({ product }) => {
  const productCount = product.count;
  const increaseCount = useCartStore((state) => state.increaseProductCount);
  const decreaseCount = useCartStore((state) => state.decreaseProductCount);
  const deleteProduct = useCartStore((state) => state.deleteProduct);

  const increase = () => {
    increaseCount(product);
  };

  const decrease = () => {
    decreaseCount(product);
  };
  return (
    <div className="cartProduct">
      <img className="cartProductImg" src={product.img} alt="" />
      <div className="cartProductInfo">
        <span>{product.name}</span>
        <p>{product.toppings.map((topping) => topping.name).join(", ")}</p>
        <p>{product.description}</p>
      </div>
      <ProductCounter count={productCount} increase={increase} decrease={decrease} />
      <span className="cartProductPrice">{product.priceWithToppings * productCount} ₽</span>
      <FaTrashCan className="cartProductDelete" onClick={() => deleteProduct(product)} />
    </div>
  );
};
export default CartProduct;
