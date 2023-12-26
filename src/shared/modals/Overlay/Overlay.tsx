import React, { FC, ReactNode } from "react";
import "./overlay.scss";

type OverlayProps = {
  handlePopup: () => void;
};

const Overlay: FC<OverlayProps> = ({ handlePopup }) => {
  return <div className="overlay" onClick={handlePopup}></div>;
};
export default Overlay;
