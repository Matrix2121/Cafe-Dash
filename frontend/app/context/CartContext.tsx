import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Product, CartItem, Order, Cafeteria } from "../types/items";
import { useAuth } from "./AuthContext";
import useCafes from "../hooks/useCafes";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  currentCafeteria: Cafeteria | null;
  productsCount: number;
  totalPrice: number;
  currOrder: () => Order;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const cafeteriaId = cartItems[0] ? cartItems[0]?.product.cafeteriaId : null;

  const { cafe: currentCafeteria } = useCafes(cafeteriaId);

  const memoizedCafeteria = useMemo(() => {
    return currentCafeteria ?? null;
  }, [currentCafeteria]);

  const addToCart = (product: Product) => {
    if(cartItems.length > 0 && product.cafeteriaId != cartItems[0].product.cafeteriaId){
      clearCart();
    }

    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );

      if (existingProduct) {
        return prevCartItems.map((cartItem) => {
          if (cartItem.product.id === product.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
            return cartItem;
          }
        });
      } else {
        return [...prevCartItems, { product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(product);
      return;
    }

    setCartItems((prevCartItems) => {
      const updatedItems = prevCartItems.map((cartItem) => {
        if (isSameProduct(cartItem, product)) {
          return createUpdatedItem(cartItem, quantity);
        } else {
          return cartItem;
        }
      });
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const productsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const removeFromCart = (product: Product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.product.id !== product.id)
    );
  };

  const isSameProduct = (cartItem: CartItem, product: Product) => {
    return cartItem.product.id === product.id;
  };

  const createUpdatedItem = (cartItem: CartItem, newQuantity: number) => {
    return { ...cartItem, quantity: newQuantity };
  };

  const currOrder = () : Order  => {
    if (!user) throw new Error("User must be logged in to create order");
    if (cartItems.length === 0) throw new Error("Cart is empty");

    return {
      discount : 0,
      status: "PROCESSING",
      readyPickupTime: new Date().toISOString(),
      tip: 0,
      cafeteriaId: cartItems[0].product.cafeteriaId,
      userId: user.id,
      totalPrice: totalPrice,
      orderProducts: cartItems.map((cartItem) => ({
        productId: cartItem.product.id,
        productPrice: cartItem.product.price,
        productQuantity: cartItem.quantity
        }))
      } 
    }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        productsCount,
        currentCafeteria : memoizedCafeteria,
        totalPrice,
        currOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
