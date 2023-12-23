import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../components/FoodSection/FoodDisplay/FoodDisplay";

const categoryToQueryMap: Record<string, any> = {
  Популярное: where("isPopular", "==", true),
  Бургеры: where("type", "==", "Бургеры"),
  Боксы: where("type", "==", "Боксы"),
  Салаты: where("type", "==", "Салаты"),
  Закуски: where("type", "==", "Закуски"),
  Десерты: where("type", "==", "Десерты"),
  Напитки: where("type", "==", "Напитки"),
  Соусы: where("type", "==", "Соусы"),
};

const productService = {
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    let q = query(collection(db, "products"));

    if (categoryToQueryMap.hasOwnProperty(category)) {
      q = query(collection(db, "products"), categoryToQueryMap[category]);
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data()) as Product[];
  },
};

export default productService;
