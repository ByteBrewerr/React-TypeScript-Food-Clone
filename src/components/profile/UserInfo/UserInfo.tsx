import "./userInfo.scss";
import OneUserInfo from "../../../shared/OneUserInfo/OneUserInfo";
import { observer } from "mobx-react-lite";
import { useUserData } from "../../../hooks/useUserData";
import { usePopUp } from "../../../hooks/usePopUp";
import InfoChangerPopup from "./InfoChangerPopup/InfoChangerPopup";
import Overlay from "../../../shared/modals/Overlay/Overlay";
import Portal from "../../../shared/Portal/Portal";

const UserInfo = () => {
  const userData = useUserData();

  const { isPopUpVisible, handlePopUp } = usePopUp();

  return (
    <div className="userInfo">
      <h2>Личные данные</h2>
      <div className="userInfoContent">
        {userData.map((item, i) => (
          <OneUserInfo key={i} label={item.label} info={item.info} icon={item.icon}></OneUserInfo>
        ))}
      </div>
      <button onClick={() => handlePopUp()}>РЕДАКТИРОВАТЬ</button>
      {isPopUpVisible && (
        <Portal>
          <Overlay handlePopup={handlePopUp}>
            <InfoChangerPopup handlePopup={handlePopUp} />
          </Overlay>
        </Portal>
      )}
    </div>
  );
};

export default observer(UserInfo);
