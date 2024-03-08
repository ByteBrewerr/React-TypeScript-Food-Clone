import React from "react";
import { FaRegClock, FaMedal, FaTruck } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import "./DeliveryInfo.scss";
import { DELIVERY_COST, MIN_ORDER_COST, DELIVRY_TIME, FREE_DELIVERY_FROM } from "../../constants/appConstants";

const DeliveryInfo = () => {
  return (
    <div className="deliveryInfo">
      <div className="deliveryInfo__time">
        <FaRegClock size={30} />
        <div>
          <h4>до {DELIVRY_TIME}мин.</h4>
          <p>ВРЕМЯ ДОСТАВКИ</p>
        </div>
      </div>

      <div className="deliveryInfo__cost">
        <FaWallet size={30} />
        <div>
          <h4>{MIN_ORDER_COST} ₽</h4>
          <p>МИН. СУММА ЗАКАЗА</p>
        </div>
      </div>

      <div className="deliveryInfo__delivery">
        <FaTruck size={30} />
        <div>
          <h4>{DELIVERY_COST} ₽</h4>
          <p>СТОИМ. ДОСТАВКИ</p>
        </div>
      </div>

      <div className="deliveryInfo__free">
        <FaMedal size={30} />
        <div>
          <h4>от {FREE_DELIVERY_FROM} ₽</h4>
          <p>БЕСПЛ. ДОСТАВКА</p>
        </div>
      </div>
    </div>
  );
};
export default DeliveryInfo;
