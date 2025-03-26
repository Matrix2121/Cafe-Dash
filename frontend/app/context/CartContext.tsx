import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types/items';

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (productId: Product, quantity: number) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const addToCart = (product: Product) => {
        setCartItems(prevCartItems => {
            const existingProduct = prevCartItems.find(cartItem => cartItem.product.id === product.id);

            if (existingProduct) {
                return prevCartItems.map(cartItem => {
                    if (cartItem.product.id === product.id) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    } else {
                        return cartItem;
                    }
                });
            } else {
                return [...prevCartItems, { product, quantity: 1 }];
            }
        }
    )};

    const updateQuantity = (product: Product, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(product);
            return;
        }

        setCartItems(prevCartItems => {
            const updatedItems = prevCartItems.map(cartItem => {
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
    }

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const removeFromCart = (product: Product) => {
        setCartItems(prevCartItems => prevCartItems.filter(cartItem => cartItem.product.id !== product.id));
    };

    const isSameProduct = (cartItem: CartItem, product: Product) => {
        return cartItem.product.id === product.id;
    };
    
    const createUpdatedItem = (cartItem: CartItem, newQuantity: number) => {
        return {...cartItem, quantity: newQuantity};
    };

  return (
    <CartContext.Provider value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart, 
        totalItems,
        totalPrice,
        }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
