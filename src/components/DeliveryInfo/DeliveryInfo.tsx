import React from "react";
import { FaRegClock, FaMedal, FaTruck } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import "./DeliveryInfo.scss";

const DeliveryInfo = () => {
  return (
    <div className="deliveryInfo">
      <div className="deliveryInfo__time">
        <FaRegClock size={30} />
        <div>
          <h4>до 90мин.</h4>
          <p>ВРЕМЯ ДОСТАВКИ</p>
        </div>
      </div>

      <div className="deliveryInfo__cost">
        <FaWallet size={30} />
        <div>
          <h4>700 ₽</h4>
          <p>МИН. СУММА ЗАКАЗА</p>
        </div>
      </div>

      <div className="deliveryInfo__delivery">
        <FaTruck size={30} />
        <div>
          <h4>200 ₽</h4>
          <p>СТОИМ. ДОСТАВКИ</p>
        </div>
      </div>

      <div className="deliveryInfo__free">
        <FaMedal size={30} />
        <div>
          <h4>от 1000 ₽</h4>
          <p>БЕСПЛ. ДОСТАВКА</p>
        </div>
      </div>
    </div>
  );
};
export default DeliveryInfo;
