import React, { useEffect, useLayoutEffect, useState } from "react";
import { useQuery, QueryKey } from "react-query";
import productService from "../../../services/productService";
import useProductsStore from "../../../stores/productsStore";

const FoodNavigation = () => {
  const [active, setActive] = useState(0);
  const foodCategories = ["Популярное", "Бургеры", "Боксы", "Салаты", "Закуски", "Десерты", "Напитки", "Соусы"];
  const { setProducts, setIsLoading } = useProductsStore();

  const { isLoading } = useQuery(
    ["products", active] as QueryKey,
    () => {
      setIsLoading(true);
      return productService.getProductsByCategory(foodCategories[active]);
    },
    {
      enabled: active !== undefined,
      onSuccess: (data) => {
        setProducts(data || []);
        setIsLoading(false);
      },
    }
  );

  return (
    <nav className="navigation">
      {foodCategories.map((category, index) => (
        <button
          className={index === active ? "navigation__button--active" : "navigation__button"}
          onClick={() => {
            setActive(index);
          }}
          key={index}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default FoodNavigation;
