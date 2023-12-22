import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebase";
import FoodItem from "./FoodItem/FoodItem";
import "./foodDisplay.scss";
import img from "../../assets/newProducts.jpg";

export type Product = {
  img: typeof img;
  description: string;
  id: string;
  isPopular: boolean;
  name: string;
  price: number;
  type: string;
};

export const FoodDisplay = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchJsonData = async () => {
      const q = query(collection(db, "products"), where("isPopular", "==", true));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let productsArray: Product[] = [];
        querySnapshot.forEach((doc) => {
          const productData = doc.data() as Product;
          productsArray.push(productData);
        });
        setProducts(productsArray);
      });

      return () => unsubscribe();
    };

    fetchJsonData();
  }, []);

  return (
    <div className="foodDisplay">
      {products.map((product) => {
        return <FoodItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default FoodDisplay;
