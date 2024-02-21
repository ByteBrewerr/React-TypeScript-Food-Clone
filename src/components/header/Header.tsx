import React, { FC } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { signOut } from "firebase/auth";
import userStore from "../../stores/userStore";
import { auth } from "../../firebase";
import { CircularProgress } from "@mui/material";

const Header: FC = () => {
  const { isLoadigUser, removeUser, name } = userStore;

  const handleSignOut = async () => {
    await signOut(auth);
    removeUser();
  };

  const headerUserRender = () => {
    if (isLoadigUser) return <CircularProgress />;
    if (name) return <p>{name}</p>;
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
        <button onClick={() => handleSignOut()}>signout</button>
        {headerUserRender()}
      </div>
    </header>
  );
};
export default observer(Header);
