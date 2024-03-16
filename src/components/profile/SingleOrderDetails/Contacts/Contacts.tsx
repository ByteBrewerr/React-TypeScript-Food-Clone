import "./contacts.scss";
import OneUserInfo from "../../../../shared/OneUserInfo/OneUserInfo";
import { FaPhone, FaUser } from "react-icons/fa6";

const Contacts = ({ name, phone }: { name: string; phone: string }) => {
  return (
    <div className="contacts">
      <h2>Контактная информация</h2>
      <OneUserInfo label="Имя" info={name} icon={<FaUser size={25} />} />
      <OneUserInfo label="Номер телефона" info={phone} icon={<FaPhone size={25} />} />
    </div>
  );
};

export default Contacts;
