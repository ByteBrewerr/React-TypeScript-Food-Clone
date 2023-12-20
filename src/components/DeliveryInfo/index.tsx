import React from "react";
import { FaRegClock } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import "./DeliveryInfo.scss";

const DeliveryInfo = () => {
  return (
    <div className="deliveryInfo">
      <div className="deliveryInfo__time">
        <FaRegClock size={30} />
        <div>
          <p>до 1ч.</p>
          <p>ВРЕМЯ ПРИГОТОВЛЕНИЯ</p>
        </div>
      </div>

      <div className="deliveryInfo__cost">
        <FaWallet size={30} />
        <div>
          <p>0 ₽</p>
          <p>МИН. СУМ. САМОВЫВОЗА</p>
        </div>
      </div>
    </div>
  );
};
export default DeliveryInfo;
