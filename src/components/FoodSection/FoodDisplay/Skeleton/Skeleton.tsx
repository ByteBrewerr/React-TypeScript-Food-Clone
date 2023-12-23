import React from "react";
import "./skeleton.scss";
import ClipLoader from "react-spinners/ClipLoader";

export const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__image">
        <ClipLoader color={"#fff"} size={50} />
      </div>
    </div>
  );
};
