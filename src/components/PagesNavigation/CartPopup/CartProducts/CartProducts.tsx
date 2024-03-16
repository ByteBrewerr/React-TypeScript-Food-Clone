import { FC } from "react";
import { ExtendedProduct } from "../../../../types/productType";
import "./cartProducts.scss";
import CartProduct from "./CartProduct/CartProduct";

type CartProductsProps = {
  products: ExtendedProduct[];
};

const CartProducts: FC<CartProductsProps> = ({ products }) => {
  return (
    <div className="cartProducts">
      {products.map((product) => {
        const key: string = `${product.id}${product.toppings.map((topping) => `${topping.name}`).join(" ")}`;
        return <CartProduct product={product} key={key} />;
      })}
    </div>
  );
};

export default CartProducts;
