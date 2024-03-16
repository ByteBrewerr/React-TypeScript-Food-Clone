import { FC } from "react";
import newProducts from "../../../assets/newProducts.jpg";
import "./newProductsPopup.scss";
import { IoMdClose } from "react-icons/io";

type PopUpProps = {
  onClose: () => void;
};

const NewProductsPopup: FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="newProductsPopup">
      <button className="onCloseButton" onClick={onClose}>
        <IoMdClose />
      </button>
      <img src={newProducts} alt="New Products" />
      <p>Новые бургеры!</p>
      <p>Встречайте два новых бургера! Рокки и Гриб Грибыч</p>
    </div>
  );
};
export default NewProductsPopup;
