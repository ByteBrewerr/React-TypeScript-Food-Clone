import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3HHRB-PtgWyvtxsvVOyFM3yDpCEXz__Q",
  authDomain: "food-clone-7945b.firebaseapp.com",
  projectId: "food-clone-7945b",
  storageBucket: "food-clone-7945b.appspot.com",
  messagingSenderId: "277114956425",
  appId: "1:277114956425:web:18b4afad8e1c8c5242b458",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
