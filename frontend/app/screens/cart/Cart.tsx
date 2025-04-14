import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '@/app/context/CartContext';
import { CartItem } from '@/app/types/items';
import useCafes from '@/app/hooks/useCafes';
import useOrders from '@/app/hooks/useOrders';
import * as Haptics from 'expo-haptics';
import styles from './Cart.style'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    currOrder,
  } = useCart();

  const cafeteriaId = cartItems.length > 0 ? cartItems[0].product.cafeteriaId : null;
  const { cafe, loading, error } = useCafes(cafeteriaId);
  const { postOrder } = useOrders();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => {
            updateQuantity(item.product, item.quantity - 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={styles.quantityButton}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            updateQuantity(item.product, item.quantity + 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={styles.quantityButton}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          removeFromCart(item.product);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        style={styles.removeButton}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <View style={styles.cafeHeader}>
            <Text style={styles.cafeHeaderText}>
              Ordering from: {cafe?.name || 'Unknown Cafe'}
            </Text>
            {cafe?.location && (
              <Text style={styles.cafeLocationText}>
                {cafe.location}
              </Text>
            )}
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.product.id.toString()}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>

            <TouchableOpacity
              onPress={() => {
                clearCart;
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);}}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={async () => {
                await postOrder(currOrder());
                clearCart();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;