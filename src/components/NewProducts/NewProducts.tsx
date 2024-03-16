import { FC } from "react";
import { usePopUp } from "../../hooks/usePopUp";
import newProducts from "../../assets/newProducts.jpg";
import Overlay from "../../shared/modals/Overlay/Overlay";
import "./NewProducts.scss";
import Portal from "../../shared/Portal/Portal";
import NewProductsPopup from "../../../src/shared/modals/newProducts/newProductsPopup";

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
