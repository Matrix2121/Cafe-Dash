import React, {useEffect} from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import theme from "@/app/theme/theme";
import {Order, OrderProduct, Product} from "@/app/types/items";
import useProduct from "@/app/hooks/useProducts";
import styles from "./OrderCard.style"

const OrderCard = ({order}: { order: Order }) => {
    const {products, fetchAllProductByOrderId, loading, error} = useProduct();

    useEffect(() => {
        if (order?.id) {
            fetchAllProductByOrderId(order.id);
        }
    }, [order?.id]);

    const renderProductItem = ({item}: { item: OrderProduct }) => (
        <View style={styles.itemRow}>
            <Text
                style={styles.itemName}>{products.find((product) => product.id == item.productId)?.name || `Product ID: ${item.productId}`}</Text>
            <Text style={styles.itemPrice}>${item.productPrice.toFixed(2)}</Text>
            <Text style={styles.itemQuantity}> x {item.productQuantity}</Text>
            <Text style={styles.itemPrice}>
                ${(item.productPrice * item.productQuantity).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>
                    {order.readyPickupTime
                        ? new Date(order.readyPickupTime).toLocaleString(("en-GB"))
                        : "Not scheduled yet"}
                </Text>
            </View>

            <View style={styles.statusContainer}>
                <View
                    style={[
                        styles.statusDot,
                        {backgroundColor: getStatusColor(order.status)},
                    ]}
                />
                <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
            </View>

            {loading ? (
                <Text style={styles.noProductsText}>Loading products...</Text>
            ) : error ? (
                <Text style={styles.noProductsText}>{error}</Text>
            ) : order.orderProducts.length === 0 ? (
                <Text style={styles.noProductsText}>No products found for this order.</Text>
            ) : (
                <FlatList
                    data={order.orderProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(product) => product.id?.toString() ?? ""}
                    scrollEnabled={false}
                />
            )}

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${order.totalPrice.toFixed(2)}</Text>
            </View>
        </View>
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

export default OrderCard;