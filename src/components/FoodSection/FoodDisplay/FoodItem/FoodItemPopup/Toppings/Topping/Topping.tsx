import { FC, useState } from "react";
import "./topping.scss";
import toppingsStore from "../../../../../../../stores/toppingsStore";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";

type ToppingProps = {
  name: string;
  price: string;
};

const Topping: FC<ToppingProps> = ({ name, price }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { setTopping, removeTopping } = toppingsStore;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setTopping({ name, price });
    }

    if (isChecked) {
      removeTopping({ name, price });
    }
  };

  return (
    <div className="topping">
      <div>
        <p className="toppingName">{name}</p>
        <p className="toppingPrice">{price} ₽</p>
      </div>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        sx={{
          padding: 0,
          color: red[900],
          "&.Mui-checked": {
            color: red[900],
          },
        }}
      />
    </div>
  );
};
export default observer(Topping);
