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
  
  export type Cafe = {
    id: number;
    name: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
  };
  
  export type CafeDetails = {
    id: number;
    name: string;
    description: string;
    openingHours: string;
    address: string;
    phone: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
  };