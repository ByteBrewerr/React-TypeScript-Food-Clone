import { useEffect } from "react";
import productsStore from "../stores/productsStore";
import userStore from "../stores/userStore";
import { Product } from "../types/productType";

const useFavoriteProduct = (product: Product) => {
  const { addFavouriteProduct, deleteFavouriteProduct, favouriteProducts, loadFavouriteProducts } = productsStore;
  const { uid } = userStore;

  useEffect(() => {
    if (uid) {
      loadFavouriteProducts(uid);
    }
  }, [uid]);

  const isFavourite = favouriteProducts?.some((item) => item.id === product.id);

  const handleFavourites = () => {
    if (isFavourite) {
      deleteFavouriteProduct(product, uid);
    }
    addFavouriteProduct(product, uid);
  };

  return {
    isFavourite,
    handleFavourites,
  };
};

export default useFavoriteProduct;
