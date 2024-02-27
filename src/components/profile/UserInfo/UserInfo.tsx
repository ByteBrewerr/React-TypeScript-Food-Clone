import React from "react";
import "./userInfo.scss";
import OneUserInfo from "./OneUserInfo/OneUserInfo";
import { observer } from "mobx-react-lite";
import { useUserData } from "../../../hooks/useUserData";
import { usePopUp } from "../../../hooks/usePopUp";
import InfoChangerPopup from "./InfoChangerPopup/InfoChangerPopup";
import ReactDOM from "react-dom";
import Overlay from "../../../shared/modals/Overlay/Overlay";

const UserInfo = () => {
  const userData = useUserData();
  const { isPopUpVisible, handlePopUp } = usePopUp();
  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <div className="userInfo">
      <h2>Личные данные</h2>
      <div className="userInfoContent">
        {userData.map((item, i) => (
          <OneUserInfo key={i} label={item.label} info={item.info} icon={item.icon}></OneUserInfo>
        ))}
      </div>
      <button onClick={() => handlePopUp()}>РЕДАКТИРОВАТЬ</button>
      {isPopUpVisible &&
        ReactDOM.createPortal(
          <Overlay handlePopup={handlePopUp}>
            <InfoChangerPopup handlePopup={handlePopUp} />
          </Overlay>,
          portalContainer
        )}
    </div>
  );
};

export default observer(UserInfo);
