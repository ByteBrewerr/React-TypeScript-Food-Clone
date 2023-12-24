import React, { FC } from "react";
import "./paymentInfo.scss";

const PaymentInfo: FC = () => {
  return (
    <div className="footer">
      <h4>Информация об оплате</h4>
      <div className="paymentInfo">
        <h3>Наличный расчёт</h3>
        <p>
          Оплата производится наличными курьеру при доставке заказа или самовывозом из точки продаж. При оформлении заказа укажите
          сумму, с которой Вам необходима сдача.
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;
