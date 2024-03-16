import { FC, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import "./pagesNavigation.scss";
import { usePopUp } from "../../hooks/usePopUp";
import CartPopup from "./CartPopup/CartPopup";
import { Link } from "react-router-dom";
import cartStore from "../../stores/cartStore";
import { observer } from "mobx-react-lite";

type NavButton = {
  text: string;
  path: string;
};

const navButtons: NavButton[] = [
  { text: "Главная", path: "/" },
  { text: "Отзывы", path: "/feedback" },
];

const PagesNavigation: FC = () => {
  const [active, setActive] = useState(0);
  const { totalPrice } = cartStore;
  const { isPopUpVisible, handlePopUp } = usePopUp();

  return (
    <div className="pagesNavContainer">
      <nav className="navigation">
        {navButtons.map((button, index) => (
          <Link
            key={index}
            to={button.path}
            className={index === active ? "navigation__button--active" : "navigation__button"}
            onClick={() => setActive(index)}
          >
            {button.text}
          </Link>
        ))}
      </nav>

      <div className="relativeDivCartButton">
        <button className="cartButton" onClick={handlePopUp}>
          <BsCart4 size={15} />
          <span>{totalPrice} ₽</span>
        </button>
        {isPopUpVisible && (
          <div className="a">
            <CartPopup closePopup={handlePopUp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(PagesNavigation);
