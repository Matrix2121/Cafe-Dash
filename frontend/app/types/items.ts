export type Cafeteria = {
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
  imageUrl: string;
}

export type CreateCafeteriaDTO = {
  name: string;
  brand: string;
  location: string;
  phoneNumber: string;
  openingHour: string;
  closingHour: string;
  imageUrl: string;
};

export type CreateUserDTO = {
  username: string;
  email: string;
  passwordHash: string;
  roleNames: string[];
}

export type Order = {
  id?: number;
  discount?: number;
  readyPickupTime?: string;
  status: string;
  tip: number;
  cafeteriaId: number;
  userId: number;
  totalPrice: number;
  orderProducts: OrderProduct[];
}

export type OrderProduct = {
  id?: number;
  orderId?: number;
  productId: number;
  productPrice: number;
  productQuantity: number;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  productType: string;
  imageUrl: string;
  cafeteriaId: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  orders: Order[];
  reviews: Review[];
}

export type UserUpdate = {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export type Role = {
  id: number;
  roleName: string;
  authority: string; // jwt stores the role names as authority
}

export type Review = {
  id: number;
  title: string;
  body?: string;
  rating: number;
  cafeteriaId: number;
  userId: number;
  createdAt?: Date;
}
