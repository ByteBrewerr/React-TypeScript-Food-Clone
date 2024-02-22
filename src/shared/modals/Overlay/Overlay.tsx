import React, { FC, ReactNode } from "react";
import "./overlay.scss";

type OverlayProps = {
  handlePopup: () => void;
  children: ReactNode;
};

const Overlay: FC<OverlayProps> = ({ handlePopup, children }) => {
  const handleClickInsideOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className="overlay" onClick={handlePopup}>
      <div className="overlayContent" onClick={handleClickInsideOverlay}>
        {children}
      </div>
    </div>
  );
};
export default Overlay;
