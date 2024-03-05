import { ExtendedProduct } from "./productType";

export type OrderType = {
  number: number;
  date: string;
  address: Address;
  payment: Payment;
  contacts: Contacts;
  products: ExtendedProduct[];
  feedback?: Feedback;
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

type Feedback = {
  imageUrl: string;
  comment: string;
  isPositive: boolean;
};
