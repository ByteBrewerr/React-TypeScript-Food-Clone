import React, { FC, ReactNode } from "react";
import "./oneUserInfo.scss";
import { observer } from "mobx-react-lite";

type OneUserInfoProps = {
  label: string;
  info: string;
  icon: ReactNode;
  disabled?: boolean;
  onChange?: (label: string, value: string) => void;
  required?: boolean;
  select?: () => JSX.Element;
};

const OneUserInfo: FC<OneUserInfoProps> = ({ label, info, icon, onChange, required = false, disabled = true, select }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    onChange && onChange(label, value);
  };

  const renderSelect = () => {
    return select ? select() : null;
  };

  const renderInput = () => {
    return <input type="text" id="info" disabled={disabled} value={info} onChange={handleChange} required={required} />;
  };

  return (
    <div className="userContent">
      {icon}
      <div className="userInfo">
        <label className={`${required ? "inputLabel--required" : "inputLabel"}`} htmlFor="info">
          {required ? label + "*" : label}
        </label>
        {select ? renderSelect() : renderInput()}
      </div>
    </div>
  );
};

export default observer(OneUserInfo);
