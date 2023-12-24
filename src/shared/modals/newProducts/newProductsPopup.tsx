import React, { FC } from "react";
import newProducts from "../../../assets/newProducts.jpg";
import "./newProductsPopup.scss";

type PopUpProps = {
  onClose: () => void;
};

const NewProductsPopup: FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="newProductsPopup">
      <img src={newProducts} alt="New Products" />
      <p>Новые бургеры!</p>
      <p>Встречайте два новых бургера! Рокки и Гриб Грибыч</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};
export default NewProductsPopup;
