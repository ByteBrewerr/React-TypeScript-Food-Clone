import React from "react";
import "./address.scss";
import OneUserInfo from "../../../../shared/OneUserInfo/OneUserInfo";
import { FaLocationDot } from "react-icons/fa6";

const Address = ({ house, street }: { house: string; street: string }) => {
  return (
    <div className="address">
      <h2>Адрес доставки</h2>
      <OneUserInfo label="Улица" info={street} icon={<FaLocationDot size={25} />} />
      <OneUserInfo label="Дом" info={house} icon={<FaLocationDot size={25} />} />
    </div>
  );
};

export default Address;
