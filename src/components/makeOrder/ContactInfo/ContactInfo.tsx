import React, { useState } from "react";
import "./contactInfo.scss";
import OneUserInfo from "../../profile/UserInfo/OneUserInfo/OneUserInfo";
import userStore from "../../../stores/userStore";
import { FaPhone, FaUser } from "react-icons/fa6";
import { FaStreetView } from "react-icons/fa";

const ContactInfo = () => {
  const { name, number } = userStore;

  const [selectedOption, setSelectedOption] = useState("Оплата наличными");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const renderSelect = () => {
    return (
      <select className="select" value={selectedOption} onChange={(e) => handleSelectChange(e.target.value)}>
        <option value="Оплата наличными">Оплата наличными</option>
        <option value="Оплата картой">Оплата картой</option>
      </select>
    );
  };

  return (
    <div className="contacts">
      <h2>Контактная информация</h2>
      <div className="contactsInfo">
        <OneUserInfo label="Имя" info={name} icon={<FaUser size={25} />} disabled={false} required={true} />
        <OneUserInfo label="Номер" info={number} icon={<FaPhone size={25} />} disabled={false} required={true} />
        <OneUserInfo label="Улица" info={""} icon={<FaStreetView size={25} />} disabled={false} required={true} />
        <OneUserInfo label="Дом" info={""} icon={<FaStreetView size={25} />} disabled={false} required={true} />
        <OneUserInfo
          label="Оплата"
          info={selectedOption}
          icon={<FaStreetView size={25} />}
          disabled={false}
          required={true}
          select={renderSelect}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
