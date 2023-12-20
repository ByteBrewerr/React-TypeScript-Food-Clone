import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const FoodDisplay = () => {
  console.log(db);

  return <div>index</div>;
};

export default FoodDisplay;
