import React, { useState } from "react";

//вынести в константы
const FoodNavigation = () => {
  const [active, setActive] = useState(0);
  const foodCategories = ["Популярное", "Бургеры", "Боксы", "ДОПЫ", "Салаты", "Закуски", "Десерты", "Напитки", "Соусы"];
  return (
    <nav className="navigation">
      {foodCategories.map((category, index) => {
        return (
          <span
            className={index === active ? "navigation__button--active" : "navigation__button"}
            onClick={() => setActive(index)}
            key={index}
          >
            {category}
          </span>
        );
      })}
    </nav>
  );
};
export default FoodNavigation;
