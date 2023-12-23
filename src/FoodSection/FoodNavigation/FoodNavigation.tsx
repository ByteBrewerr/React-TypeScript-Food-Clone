import React, { useState } from "react";
import { useQuery, QueryKey } from "react-query";
import productService from "../../services/productService";
import useProductsStore from "../../stores/productsStore";

const FoodNavigation = () => {
  const [active, setActive] = useState(0);
  const foodCategories = ["Популярное", "Бургеры", "Боксы", "Салаты", "Закуски", "Десерты", "Напитки", "Соусы"];
  const { setProducts } = useProductsStore();

  const {} = useQuery(["products", active] as QueryKey, () => productService.getProductsByCategory(foodCategories[active]), {
    enabled: active !== undefined,
    onSuccess: (data) => {
      setProducts(data || []);
    },
  });

  return (
    <nav className="navigation">
      {foodCategories.map((category, index) => (
        <span
          className={index === active ? "navigation__button--active" : "navigation__button"}
          onClick={() => setActive(index)}
          key={index}
        >
          {category}
        </span>
      ))}
    </nav>
  );
};

export default FoodNavigation;
