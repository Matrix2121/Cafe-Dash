import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useAuth } from '@/app/context/AuthContext';
import useOrders from '@/app/hooks/useOrders';

import LoadingErrorView from '@/app/components/errorView/LoadingErrorView';
import { Order, OrderProduct } from '@/app/types/items';

import theme from '@/app/theme/theme';
import styles from "./Orders.style";

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return (
        <LoadingErrorView
            loading={false}
            error={""}
            dataAvailable={!!user}
        />
    )
  }
  
  const { orders, loading, error } = useOrders(user.id);

  if (loading || error) {
    return (
        <View style={styles.loadingErrorContainer}>
          <LoadingErrorView
            loading={loading}
            error={error}
            dataAvailable={!!user}
          />
        </View>
      );
  }

  const renderProductItem = ({ item }: { item: OrderProduct }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>Product #{item.productId}</Text>
      <Text style={styles.itemQuantity}>x{item.productQuantity}</Text>
      <Text style={styles.itemPrice}>${item.productPrice.toFixed(2)}</Text>
    </View>
  );

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>
        {item.readyPickupTime 
          ? new Date(item.readyPickupTime).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        : 'Not scheduled yet'}
        </Text>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>

      <FlatList
        data={item.orderProducts}
        renderItem={renderProductItem}
        keyExtractor={(product) => product.id?.toString() ?? ''}
        scrollEnabled={false}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${item.totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderOrderItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      }
    />
  );
};

const getStatusColor = (status: string) => {
  switch(status.toLowerCase()) {
    case 'delivered': return '#4CAF50';
    case 'processsing': return '#FFC107';
    case 'cancelled': return '#F44336';
    case 'postponed': return '#2196F3';
    default: return theme.colors.textSecondary;
  }
};

export default Orders;