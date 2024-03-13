import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

type PortalContainerProps = {
  children: ReactNode;
};

const Portal: FC<PortalContainerProps> = ({ children }) => {
  const portalContainer = document.getElementById("portal-container");

  if (!portalContainer) {
    console.error("Portal not found.");
    return null;
  }

  return ReactDOM.createPortal(children, portalContainer);
};

export default Portal;
