import React, { FC } from "react";
import "./header.scss";

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <span>BurgerRush</span>
        <button>Войти</button>
      </div>
    </header>
  );
};
export default Header;
