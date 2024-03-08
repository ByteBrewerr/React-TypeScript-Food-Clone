import React, { useEffect, useState } from "react";
import OneUserInfo from "../../shared/OneUserInfo/OneUserInfo";
import { FaPhone, FaUser } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FaStreetView } from "react-icons/fa";
import userStore from "../../stores/userStore";
import { observer } from "mobx-react-lite";
import Footer from "../Footer/Footer";
import sleep from "../../utils/sleep";
import CircularProgress from "@mui/material/CircularProgress";
import { get, getDatabase, ref, runTransaction, update } from "firebase/database";
import notify from "../../utils/notify";
import { useNavigate } from "react-router";
import { OrderType, Payment } from "../../types/orderType";
import cartStore from "../../stores/cartStore";
import getFormattedTime from "../../utils/getFormattedTime";
import { MIN_ORDER_COST } from "../../constants/appConstants";
import "./makeOrder.scss";

const ContactInfo = () => {
  const { name, number, uid } = userStore;
  const { products, totalPrice } = cartStore;

  const [formData, setFormData] = useState<Record<string, string>[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderNumber, setOrderNumber] = useState(null);

  const navigate = useNavigate();

  const phonePattern = /^\+\d{11}$/;

  useEffect(() => {
    setFormData([
      { label: "Имя", info: name },
      { label: "Номер", info: number },
      { label: "Улица", info: "" },
      { label: "Дом", info: "" },
      { label: "Оплата", info: "Наличными" },
    ]);
  }, [name, number]);

  useEffect(() => {
    const database = getDatabase();
    const orderNumberRef = ref(database, "orderNumber");

    const fetchOrderNumber = async () => {
      try {
        const snapshot = await get(orderNumberRef);
        const currentOrderNumber = snapshot.val() || 0;
        setOrderNumber(currentOrderNumber);
      } catch (error) {
        notify("Ошибка", "error");
      }
    };

    fetchOrderNumber();
  }, []);

  const updateOrderNumber = async () => {
    const database = getDatabase();
    const orderNumberRef = ref(database, "orderNumber");

    try {
      await runTransaction(orderNumberRef, (currentOrderNumber) => {
        setOrderNumber((currentOrderNumber || 0) + 1);
        return (currentOrderNumber || 0) + 1;
      });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const createOrder = async () => {
    const database = getDatabase();
    const ordersRef = ref(database, `users/${uid}/orders/${orderNumber}`);

    const street = formData.find((item) => item.label === "Улица")?.info ?? "";
    const house = formData.find((item) => item.label === "Дом")?.info ?? "";
    const payment = formData.find((item) => item.label === "Оплата")?.info as Payment;
    const name = formData.find((item) => item.label === "Имя")?.info ?? "";
    const number = formData.find((item) => item.label === "Номер")?.info ?? "";

    const newOrder: OrderType = {
      number: orderNumber!,
      address: { street, house },
      contacts: { name, number },
      date: `${getFormattedTime().day}, ${getFormattedTime().time}`,
      payment,
      products,
    };
    try {
      await update(ordersRef, { ...newOrder });
      await updateOrderNumber();
    } catch (error) {
      notify("Ошибка", "error");
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    formData.forEach((item) => {
      if (item.label === "Номер" && !phonePattern.test(item.info)) {
        newErrors[item.label] = "Введите корректный номер телефона (в формате +12345678901)";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (label: string, value: string) => {
    setFormData((prevData) => prevData.map((item) => (item.label === label ? { ...item, info: value } : item)));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => prevData.map((item) => (item.label === "Оплата" ? { ...item, info: value } : item)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalPrice < MIN_ORDER_COST) {
      notify("Минимальная цена заказа 700₽", "error");
      return;
    }

    if (validateForm()) {
      setSubmitting(true);

      await sleep(1000);
      await createOrder();

      navigate("/profile/orderHistory");

      setSubmitting(false);
    }
  };

  const renderSelect = () => {
    return (
      <select
        className="select"
        value={formData.find((item) => item.label === "Оплата")?.info}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option value="Наличными">Оплата наличными</option>
        <option value="Картой">Оплата картой</option>
      </select>
    );
  };

  return (
    <>
      <div className="contacts">
        <h2>Контактная информация</h2>
        <form className="contactsInfo" onSubmit={(e) => handleSubmit(e)}>
          {formData.map((data) => (
            <React.Fragment key={data.label}>
              <OneUserInfo
                key={data.label}
                label={data.label}
                info={data.info}
                icon={getIcon(data.label)}
                onChange={handleInputChange}
                select={data.label === "Оплата" ? renderSelect : undefined}
                required={true}
                disabled={false}
              />
              <span className="infoChangerErrors">{errors[data.label] && <div className="error">{errors[data.label]}</div>}</span>
            </React.Fragment>
          ))}
          <button type="submit" disabled={submitting}>
            {submitting ? <CircularProgress size={20} /> : "Оформить заказ"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const getIcon = (label: string) => {
  switch (label) {
    case "Имя":
      return <FaUser size={25} />;
    case "Номер":
      return <FaPhone size={25} />;
    case "Улица":
    case "Дом":
      return <FaStreetView size={25} />;
    case "Оплата":
      return <MdAttachMoney size={25} />;
    default:
      return null;
  }
};

export default observer(ContactInfo);
