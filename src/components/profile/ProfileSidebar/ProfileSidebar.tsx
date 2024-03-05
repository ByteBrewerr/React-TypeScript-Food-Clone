import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./profileSidebar.scss";
import Confirmation from "../../../shared/modals/Confirmation/Confirmation";
import ReactDOM from "react-dom";
import Overlay from "../../../shared/modals/Overlay/Overlay";
import { usePopUp } from "../../../hooks/usePopUp";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const textWithPath = [
  { path: "personalData", text: "Личные данные" },
  { path: "orderHistory", text: "История заказов" },
  { path: "feedbackHistory", text: "История отзывов" },
];

const ProfileSidebar = () => {
  const { isPopUpVisible, handlePopUp } = usePopUp();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeId, setActiveId] = useState(() => getId());

  function getId() {
    const pathSegments = location.pathname.split("/");
    const lastPathSegment = pathSegments[pathSegments.length - 1];
    const newActiveId = textWithPath.findIndex((el) => el.path === lastPathSegment);

    return newActiveId !== -1 ? newActiveId : 0;
  }

  const handleExit = async (isExit: boolean) => {
    if (isExit) {
      await signOut(auth);
      navigate("/");
      return;
    }
    handlePopUp();
  };

  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <div className="profileSidebar">
      <h3>Профиль</h3>
      <nav>
        <ul>
          {textWithPath.map((el, index) => {
            return (
              <li key={index}>
                <Link
                  className={`${activeId === index ? "navigation__button--active" : "navigation__button"}`}
                  to={`/profile/${el.path}`}
                  onClick={() => setActiveId(index)}
                >
                  {el.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button className="navigation__button" onClick={() => handlePopUp()}>
        Выйти
      </button>
      {isPopUpVisible && (
        <>
          {ReactDOM.createPortal(
            <Overlay handlePopup={handlePopUp}>
              <Confirmation text={"Вы действительно хотите выйти?"} onClick={handleExit} />
            </Overlay>,
            portalContainer
          )}
        </>
      )}
    </div>
  );
};

export default ProfileSidebar;
