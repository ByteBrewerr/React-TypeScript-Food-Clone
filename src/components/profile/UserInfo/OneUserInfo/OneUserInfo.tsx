import React, { FC, ReactNode } from "react";
import "./oneUserInfo.scss";
import { observer } from "mobx-react-lite";

type OneUserInfoProps = {
  canChange?: boolean;
  label: string;
  info?: string;
  icon: ReactNode;
  disabled?: boolean;
  onChange?: (label: string, value: string) => void;
};

const OneUserInfo: FC<OneUserInfoProps> = ({ disabled = true, label, info, icon, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(label, e.target.value);
  };

  return (
    <div className="userContent">
      {icon}
      <div className="userInfo">
        <label htmlFor="info">{label}</label>
        <input type="text" id="info" disabled={disabled} value={info} onChange={handleChange} />
      </div>
    </div>
  );
};

export default observer(OneUserInfo);
