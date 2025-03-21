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

export type Review = {
  id: number;
  title: string;
  body: string;
  rating: number;
  createdAt: Date;
};
export type User = {
  id: number;
  username: string;
  email: string;
  role: Role[];
  orders: Order[];
}

export type Role = {
  id: number;
  roleName: string;
}

export type Order = {
  id: number;
  discount: number;
  readyPickupTime: string;
  status: string;
  tip: number
  cafeteriaId: number;
  userId: number;
  totalPrice: number;
  orderProducts: OrderProduct[];
}

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  productPrice: number;
  productQuantity: number;
}
