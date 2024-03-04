import { ExtendedProduct, Product } from "./productType";

export type OrderType = {
  number: number;
  date: string;
  address: Address;
  payment: "Картой" | "Наличными";
  contacts: Contacts;
  products: ExtendedProduct[];
};

export type Address = {
  street: string;
  house: string;
};
export type Payment = "Картой" | "Наличными";

export type Contacts = {
  name: string;
  number: string;
};
