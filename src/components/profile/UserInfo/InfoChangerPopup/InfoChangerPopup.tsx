import React, { useState, FormEvent, useEffect, FC } from "react";
import "./infoChangerPopup.scss";
import { useUserData } from "../../../../hooks/useUserData";
import OneUserInfo from "../../../../shared/OneUserInfo/OneUserInfo";
import { observer } from "mobx-react-lite";
import userStore from "../../../../stores/userStore";

type InfoChangerPopupProps = {
  handlePopup: () => void;
};

const InfoChangerPopup: FC<InfoChangerPopupProps> = ({ handlePopup }) => {
  const initialData = useUserData();
  const filteredData = initialData.filter((item) => {
    return item.label === "Номер" || item.label === "Имя";
  });
  const [formData, setFormData] = useState(filteredData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const phonePattern = /^\+\d{11}$/;

  const { updateName, updateNumber } = userStore;

  useEffect(() => {
    setFormData(filteredData);
  }, [initialData]);

  const handleChange = (label: string, value: string) => {
    setFormData((prevData) => prevData.map((item) => (item.label === label ? { ...item, info: value } : item)));
    setErrors((prevErrors) => ({ ...prevErrors, [label]: "" }));
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      formData.forEach((item) => {
        if (item.info !== initialData.find((dataItem) => dataItem.label === item.label)?.info) {
          if (item.label === "Номер") {
            console.log(item.info);
            updateNumber(item.info);
          }
          if (item.label === "Имя") {
            updateName(item.info);
          }
        }
      });
      handlePopup();
    }
  };

  return (
    <form className="infoChanger" onSubmit={handleSubmit}>
      <h2>Личные данные</h2>
      {formData.map((item, i) => (
        <div key={i} className="form-group">
          <OneUserInfo disabled={false} label={item.label} info={item.info} icon={item.icon} onChange={handleChange} />
          <span className="infoChangerErrors">{errors[item.label] && <div className="error">{errors[item.label]}</div>}</span>
        </div>
      ))}
      <button type="submit">Сохранить изменения</button>
    </form>
  );
};

export default observer(InfoChangerPopup);
