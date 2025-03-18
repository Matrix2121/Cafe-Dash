// src/types/item.ts
export type Cafe = {
  id: number;
  name: string;
  brand: string;
  location: string;
  rating: number;
  countReview: number;
  phoneNumber: string;
  openingHour: string;
  closingHour: string;
  isDeleted: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  productType: string;
  cafeteriaId: number;
  isDeleted: boolean;
};

export type CartItem = {
  itemId: number;
  quantity: number;
};