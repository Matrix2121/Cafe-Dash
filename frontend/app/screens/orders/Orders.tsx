import React from "react";
import { View, ScrollView } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import useOrders from "@/app/hooks/useOrders";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import OrderCard from "@/app/components/orderCard/OrderCard";
import styles from "./Orders.style";
import OrdersHeader from "@/app/components/headers/ordersHeader/OrdersHeader";
import { Order } from "@/app/types/items";

const Orders = () => {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders(user?.id);

  if (!user) {
    return (
      <LoadingErrorView loading={false} error={""} dataAvailable={!!user} />
    );
  }

  if (loading || error) {
    return (
      <View style={styles.container}>
        <OrdersHeader />
        <View style={styles.loadingErrorContainer}>
          <LoadingErrorView
            loading={loading}
            error={error}
            dataAvailable={!!user}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OrdersHeader />

      <ScrollView style={styles.gridContainer}>
        {orders.map((order: Order) => (
          <View key={order.id} style={styles.cardWrapper}>
            <OrderCard order={order} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Orders;
