import React, { FC } from "react";
import "./details.scss";
import OneUserInfo from "../../../../shared/OneUserInfo/OneUserInfo";
import { FaHashtag } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

type DetailsProps = {
  number: number;
  payment: string;
  date: string;
};

const Details: FC<DetailsProps> = ({ number, payment, date }) => {
  return (
    <div className="details">
      <OneUserInfo label="Номер заказа" info={number.toString()} icon={<FaHashtag size={25} />} />
      <OneUserInfo label="Способ оплаты" info={payment} icon={<MdPayment size={25} />} />
      <OneUserInfo label="Дата заказа" info={date} icon={<BsCalendar2Date size={25} />} />
    </div>
  );
};

export default Details;
