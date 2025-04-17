import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import theme from "@/app/theme/theme";
import { Order, OrderProduct } from "@/app/types/items";
import useProduct from "@/app/hooks/useProducts";
import useOrders from "@/app/hooks/useOrders";
import styles from "./EditOrder.style";

const EditOrder = () => {
    const { orders, fetchAllOrders, updateOrderStatus } = useOrders();
    const {fetchAllProductByOrderId, products} = useProduct();
    const [statusMap, setStatusMap] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            await fetchAllOrders();
        };
        fetchOrdersAndProducts();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            orders.forEach((order) => {
                if (order.id !== undefined) {
                    fetchAllProductByOrderId(order.id);
                }
            });
        }
    }, [orders]);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        setStatusMap((prev) => ({ ...prev, [orderId]: newStatus }));
        updateOrderStatus(orderId, newStatus);
        fetchAllOrders();
    };

    const renderProductItem = () => ({ item }: { item: OrderProduct }) => (
        <View style={styles.itemRow}>
            <Text style={styles.itemName}>
                {products.find((p) => p.id === item.productId)?.name || `Product ID: ${item.productId}`}
            </Text>
            <Text style={styles.itemPrice}>${item.productPrice.toFixed(2)}</Text>
            <Text style={styles.itemQuantity}> x {item.productQuantity}</Text>
            <Text style={styles.itemPrice}>
                ${(item.productPrice * item.productQuantity).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {orders.map((order) => {
                if (order.id === undefined) return null;
                const currentStatus = statusMap[order.id] || order.status;

                return (
                    <View key={order.id} style={styles.orderContainer}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                            <Text style={styles.orderDate}>
                                {order.readyPickupTime
                                    ? new Date(order.readyPickupTime).toLocaleString("en-GB")
                                    : "Not scheduled yet"}
                            </Text>
                        </View>

                        <View style={styles.statusContainer}>
                            <View
                                style={[
                                    styles.statusDot,
                                    { backgroundColor: getStatusColor(currentStatus) },
                                ]}
                            />
                            <Text style={styles.statusText}>{currentStatus.toUpperCase()}</Text>
                        </View>

                        <Picker
                            selectedValue={currentStatus}
                            onValueChange={(newStatus) => handleStatusChange(order.id!, newStatus)}
                            style={{ marginVertical: 10 }}
                        >
                            <Picker.Item label="Processing" value="processing" />
                            <Picker.Item label="Delivered" value="delivered" />
                            <Picker.Item label="Cancelled" value="cancelled" />
                            <Picker.Item label="Postponed" value="postponed" />
                        </Picker>

                        <FlatList
                            data={order.orderProducts}
                            renderItem={renderProductItem()}
                            keyExtractor={(p) => p.id?.toString() ?? ""}
                            scrollEnabled={false}
                        />

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalAmount}>${order.totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "delivered":
            return "#4CAF50";
        case "processing":
            return "#FFC107";
        case "cancelled":
            return "#F44336";
        case "postponed":
            return "#2196F3";
        default:
            return theme.colors.textSecondary;
    }
};

export default EditOrder;
