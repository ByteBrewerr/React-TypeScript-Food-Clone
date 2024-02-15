import React, { useState } from "react";
import { useQuery } from "react-query";
import productService from "../../../services/productService";
import useProductsStore from "../../../stores/productsStore";

const FoodNavigation = () => {
  const [active, setActive] = useState(0);
  const foodCategories = ["Популярное", "Бургеры", "Боксы", "Салаты", "Закуски", "Десерты", "Напитки", "Соусы"];

  const setProducts = useProductsStore((state) => state.setProducts);
  const setIsLoading = useProductsStore((state) => state.setIsLoading);

  useQuery({
    queryKey: ["products", active],
    queryFn: () => {
      setIsLoading(true);
      return productService.getProductsByCategory(foodCategories[active]);
    },
    onSuccess(data) {
      setProducts(data || []);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

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
