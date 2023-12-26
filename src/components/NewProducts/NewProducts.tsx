// NewProducts.jsx
import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { usePopUp } from "../../hooks/usePopUp";
import NewProductsPopup from "../../shared/modals/NewProducts/NewProductsPopup";
import newProducts from "../../assets/newProducts.jpg";
import "./NewProducts.scss";
import Overlay from "../../shared/modals/Overlay/Overlay";

const NewProducts: FC = () => {
  const { isPopUpVisible, handlePopUp } = usePopUp();

  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    alert("no portal");
    return null;
  }

  return (
    <div>
      <img className="NewProductsImage" src={newProducts} alt="New Products" onClick={handlePopUp} />

      {isPopUpVisible && (
        <>
          {ReactDOM.createPortal(<Overlay handlePopup={handlePopUp} />, portalContainer)}
          {ReactDOM.createPortal(<NewProductsPopup onClose={handlePopUp} />, portalContainer)}
        </>
      )}
    </div>
  );
};

export default NewProducts;
