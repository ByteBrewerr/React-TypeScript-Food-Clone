import { getDatabase, ref, onValue } from "firebase/database";
import { Product } from "../types/productType";

const productService = {
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const productsRef = ref(db, "/products/" + category);

      onValue(
        productsRef,
        (snapshot) => {
          const productsData = snapshot.val();
          resolve(productsData);
        },
        {
          onlyOnce: true,
        }
      );
    });
  },
};

export default productService;
