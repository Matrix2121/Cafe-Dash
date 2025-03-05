// src/types/item.ts
export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type CartItem = {
  itemId: number;
  quantity: number;
};