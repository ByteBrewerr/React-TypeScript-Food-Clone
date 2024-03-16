import { useState } from "react";

export const usePopUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const handlePopUp = () => {
    setIsPopUpVisible((prev) => !prev);
  };

  return { isPopUpVisible, handlePopUp };
};
