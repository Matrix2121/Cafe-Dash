// src/services/cartService.ts
import api from './apiClient';
import { CartItem } from '../types/item';

export const addToCart = async (item: CartItem) => {
  try {
    const response = await api.post('/cart/items', item);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add item to cart');
  }
};