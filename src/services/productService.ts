import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../FoodSection/FoodDisplay/FoodDisplay";

const productService = {
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    let q = query(collection(db, "products"));

    if (category === "Популярное") {
      q = query(collection(db, "products"), where("isPopular", "==", true));
    }

    if (category === "Бургеры") {
      q = query(collection(db, "products"), where("type", "==", "Бургеры"));
    }

    if (category === "Боксы") {
      q = query(collection(db, "products"), where("type", "==", "Боксы"));
    }

    if (category === "Салаты") {
      q = query(collection(db, "products"), where("type", "==", "Салаты"));
    }

    if (category === "Закуски") {
      q = query(collection(db, "products"), where("type", "==", "Закуски"));
    }

    if (category === "Десерты") {
      q = query(collection(db, "products"), where("type", "==", "Десерты"));
    }
    if (category === "Напитки") {
      q = query(collection(db, "products"), where("type", "==", "Напитки"));
    }
    if (category === "Соусы") {
      q = query(collection(db, "products"), where("type", "==", "Соусы"));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data()) as Product[];
  },
};

export default productService;
