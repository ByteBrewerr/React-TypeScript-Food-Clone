import React, { FC, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../stores/userStore";
import { CircularProgress } from "@mui/material";

const Header: FC = () => {
  const { isLoadingUser, name } = userStore;

  const headerUserRender = () => {
    const isAuth = !!name;
    if (isLoadingUser) return <CircularProgress />;
    if (isAuth) return <Link to="/profile/personalData">{name}</Link>;
    return (
      <Link className="loginBtn" to="/login">
        Войти
      </Link>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <Link className="backToMainBtn" to="/">
          BurgerRush
        </Link>
        {headerUserRender()}
      </div>
    </header>
  );
};
export default observer(Header);
