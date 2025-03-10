// src/types/item.ts
export type CafeLong = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  phone: string;
  openingHours: string;
};

export type CafeShort = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  productType: string;
};

// export type CartItem = {
//   itemId: number;
//   quantity: number;
// };