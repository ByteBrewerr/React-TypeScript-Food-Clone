import React from "react";
import "./orderInfo.scss";
import { FaExclamation } from "react-icons/fa";
import { DELIVERY_COST, MIN_ORDER_COST } from "../../../../utils/constants/appConstants";
import cartStore from "../../../../stores/cartStore";
import { observer } from "mobx-react-lite";
import notify from "../../../../utils/notify";
import { useNavigate } from "react-router";

const OrderInfo = () => {
  const { totalPrice } = cartStore;
  const deliveryCost = totalPrice >= 1000 ? 0 : DELIVERY_COST;
  const navigate = useNavigate();
  const handleOrder = () => {
    if (totalPrice <= MIN_ORDER_COST) {
      notify(`Минимальная сумма заказа ${MIN_ORDER_COST} ₽`, "error");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <div className="orderDeliveryDanger">
        <div className="exclamation">
          <FaExclamation size={30} />
        </div>
        <p>
          ЕСЛИ ОПЕРАТОР НЕ СМОЖЕТ ДО ВАС ДОЗВОНИТСЯ В ТЕЧЕНИИ 10 МИНУТ, ЧТО БЫ ПОДТВЕРДИТЬ ЗАКАЗ - ОН БУДЕТ ОТМЕНЕН АВТОМАТИЧЕСКИ.
          ДЛЯ НОВЫХ И НЕ ПОСТОЯННЫХ КЛИЕНТОВ ДОСТАВКА И САМОВЫВОЗ СВЫШЕ 500 РУБ. ОСУЩЕСТВЛЯЮТСЯ ИСКЛЮЧИТЕЛЬНО ПО 100 % ПРЕДОПЛАТЕ.
          ОБРАЩАЕМ ВАШЕ ВНИМАНИЕ ЧТО ПОДТВЕРЖДЕННЫЙ ПО ТЕЛЕФОНУ ЗАКАЗ ОТМЕНИТЬ НЕЛЬЗЯ!!! ЕСЛИ ПРИ ВЫПОЛНЕНИИ ДОСТАВКИ, КУРЬЕР,
          ПРИБЫВ НА АДРЕС, УКАЗАННЫЙ В ЗАКАЗЕ, НЕ СМОЖЕТ ДОЗВОНИТЬСЯ ДО ВАС, ТО ПЕРЕД ТЕМ, КАК ПОКИНУТЬ ДАННЫЙ АДРЕС, ОН БУДЕТ
          ЖДАТЬ ВАС ЕЩЕ 10 МИНУТ. ПО ИСТЕЧЕНИИ 10 МИНУТ — ЗАКАЗ БУДЕТ СЧИТАТЬСЯ ВЫПОЛНЕННЫМ. ПРИ ЭТОМ ДЕНЕЖНЫЕ СРЕДСТВА НЕ
          ВОЗВРАЩАЮТСЯ!
        </p>
      </div>

      <div className="orderInfo">
        <div>
          <span>Сумма заказа:</span>
          <span>{totalPrice} ₽</span>
        </div>
        <div>
          <span>Доставка:</span>
          <span>{deliveryCost ? DELIVERY_COST : "Бесплатно"}</span>
        </div>
        <div>
          <span>К оплате:</span>
          <span>{totalPrice + deliveryCost} ₽</span>
        </div>
      </div>
      <button className="DoOrderBtn" onClick={() => handleOrder()}>
        ОФОРМИТЬ ЗАКАЗ
      </button>
    </>
  );
};
export default observer(OrderInfo);
