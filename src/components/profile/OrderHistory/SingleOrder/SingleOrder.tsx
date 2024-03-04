import React, { FC } from "react";
import "./singleOrder.scss";
import OneUserInfo from "../../../../shared/OneUserInfo/OneUserInfo";
import { Address } from "../../../../types/orderType";
import { Link } from "react-router-dom";

type SingleOrderProps = {
  number: number;
  date: string;
  address: Address;
};

const SingleOrder: FC<SingleOrderProps> = ({ number, date, address }) => {
  return (
    <div className="singleOrder">
      <OneUserInfo label="Номер заказа" info={number.toString()} />
      <OneUserInfo label="Дата заказа" info={date} />
      <OneUserInfo label="Адрес доставки" info={`ул. ${address.street}, дом ${address.house}`} />
      <Link to={`/profile/orderHistory/${number}`}>
        <button>ПОДРОБНЕЕ</button>
      </Link>
    </div>
  );
};

export default SingleOrder;
