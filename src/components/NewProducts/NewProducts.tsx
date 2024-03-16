import { FC } from "react";
import { usePopUp } from "../../hooks/usePopUp";
import NewProductsPopup from "../../shared/modals/NewProducts/NewProductsPopup";
import newProducts from "../../assets/newProducts.jpg";
import Overlay from "../../shared/modals/Overlay/Overlay";
import "./NewProducts.scss";
import { Portal } from "@mui/material";

const NewProducts: FC = () => {
  const { isPopUpVisible, handlePopUp } = usePopUp();

  return (
    <div>
      <img className="NewProductsImage" src={newProducts} alt="New Products" onClick={handlePopUp} />

      {isPopUpVisible && (
        <Portal>
          <Overlay handlePopup={handlePopUp}>
            <NewProductsPopup onClose={handlePopUp} />
          </Overlay>
        </Portal>
      )}
    </div>
  );
};

export default NewProducts;
