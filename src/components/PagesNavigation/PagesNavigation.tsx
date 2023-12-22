import React, { FC, useState } from "react";

const PagesNavigation: FC = () => {
  const [active, setActive] = useState(0);
  const navText = ["Главная", "Акции", "Отзывы"];

  return (
    <nav className="navigation">
      {navText.map((text, index) => {
        return (
          <span
            className={index === active ? "navigation__button--active" : "navigation__button"}
            onClick={() => setActive(index)}
            key={index}
          >
            {text}
          </span>
        );
      })}
    </nav>
  );
};

export default PagesNavigation;
