import React, { useState } from "react";
import { useQuery } from "react-query";
import productService from "../../../services/productService";
import productsStore from "../../../stores/productsStore";
import { observer } from "mobx-react-lite";

const foodCategoriesEng = ["popular", "burgers", "boxes", "salads", "snacks", "desserts", "drinks", "sauces"];
const foodCategoriesRus = ["Популярное", "Бургеры", "Боксы", "Салаты", "Закуски", "Десерты", "Напитки", "Соусы"];

const FoodNavigation = () => {
  const [active, setActive] = useState(0);

  const { setProducts, setIsLoading, favouriteProducts } = productsStore;

  const { isLoading } = useQuery({
    queryKey: ["products", active],
    queryFn: () => {
      setIsLoading(isLoading);
      if (active === foodCategoriesRus.length) {
        return favouriteProducts;
      }
      return productService.getProductsByCategory(foodCategoriesEng[active]);
    },
    onSuccess(data) {
      setProducts(data || []);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  const hasFavouriteProducts = favouriteProducts?.length > 0;
  return (
    <nav className="navigation">
      {foodCategoriesRus.map((category, index) => (
        <React.Fragment key={index}>
          <button
            className={index === active ? "navigation__button--active" : "navigation__button"}
            onClick={() => {
              setActive(index);
            }}
            key={index}
          >
            {category}
          </button>
          {index === 0 && hasFavouriteProducts ? (
            <button
              className={foodCategoriesRus.length === active ? "navigation__button--active" : "navigation__button"}
              onClick={() => {
                setActive(foodCategoriesRus.length);
              }}
              key={foodCategoriesRus.length}
            >
              Избранное
            </button>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default observer(FoodNavigation);
