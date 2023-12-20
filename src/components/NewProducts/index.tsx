// NewProducts.jsx
import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import newProducts from "../../assets/newProducts.jpg";
import "./NewProducts.scss";

type PopUpProps = {
  onClose: () => void;
};

const NewProducts: FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <div>
      <img className="NewProductsImage" src={newProducts} alt="New Products" onClick={togglePopup} />

      {isPopupVisible && (
        <>
          {ReactDOM.createPortal(<div className="Overlay" onClick={togglePopup}></div>, portalContainer)}
          {ReactDOM.createPortal(<Popup onClose={togglePopup} />, portalContainer)}
        </>
      )}
    </div>
  );
};

const Popup: FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="Popup">
      <img src={newProducts} alt="New Products" />
      <p>Новые бургеры!</p>
      <p>Встречайте два новых бургера! Рокки и Гриб Грибыч</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default NewProducts;
