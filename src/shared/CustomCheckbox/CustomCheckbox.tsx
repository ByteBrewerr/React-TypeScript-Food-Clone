// CustomCheckbox.tsx
import React, { FC } from "react";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

type CheckboxProps = {
  isChecked: boolean;
  onCheckboxChange: () => void;
};

const CustomCheckbox: FC<CheckboxProps> = ({ isChecked, onCheckboxChange }) => {
  return (
    <Checkbox
      checked={isChecked}
      onChange={onCheckboxChange}
      sx={{
        padding: 0,
        color: red[900],
        "&.Mui-checked": {
          color: red[900],
        },
      }}
    />
  );
};
export default CustomCheckbox;
