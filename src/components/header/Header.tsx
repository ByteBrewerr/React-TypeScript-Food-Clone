import { FC } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../stores/userStore";
import { CircularProgress } from "@mui/material";
import { FaUser } from "react-icons/fa";

const Header: FC = () => {
  const { isLoadingUser, name } = userStore;

  const headerUserRender = () => {
    const isAuth = !!name;
    if (isLoadingUser) return <CircularProgress />;
    if (isAuth)
      return (
        <Link className="navigation__button" to="/profile/personalData">
          <FaUser style={{ marginRight: "8px" }} />
          {name}
        </Link>
      );
    return (
      <Link className="loginBtn navigation__button" to="/login">
        Войти
      </Link>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <Link className="backToMainBtn navigation__button" to="/">
          BurgerRush
        </Link>
        {headerUserRender()}
      </div>
    </header>
  );
};
export default observer(Header);
