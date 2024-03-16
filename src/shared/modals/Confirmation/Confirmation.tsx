import { FC } from "react";
import "./confirmation.scss";

type ConfirmationProps = {
  text: string;
  onClick: (isYes: boolean) => void;
};

const Confirmation: FC<ConfirmationProps> = ({ text, onClick }) => {
  return (
    <div className="confirmation">
      <h3>ВНИМАНИЕ</h3>
      <p>{text}</p>
      <button onClick={() => onClick(true)}>ДА</button>
      <button onClick={() => onClick(false)}>НЕТ</button>
    </div>
  );
};

export default Confirmation;
