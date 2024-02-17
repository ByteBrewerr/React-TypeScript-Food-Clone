import React, { FC } from "react";
import "./header.scss";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <Link className="backToMainBtn" to="/">
          BurgerRush
        </Link>
        <Link className="loginBtn" to="/login">
          Войти
        </Link>
      </div>
    </header>
  );
};
export default Header;
