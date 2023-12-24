import React, { FC } from "react";
import "./FoodItemPopup.scss";

type PopUpProps = {
  onClose: () => void;
};

const FoodItemPopup: FC<PopUpProps> = () => {
  return <div className="foodItemPopup">FoodItemPopup</div>;
};
export default FoodItemPopup;
