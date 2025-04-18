import React from "react";
import {View, ScrollView, Text} from "react-native";
import {useAuth} from "@/app/context/AuthContext";
import useOrders from "@/app/hooks/useOrders";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import OrderCard from "@/app/components/orderCard/OrderCard";
import styles from "./Orders.style";
import {Order} from "@/app/types/items";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";

const Orders = () => {
    const {user} = useAuth();
    const {orders, loading, error} = useOrders(user?.id);

    if (!user) {
        return (
            <LoadingErrorView loading={false} error={""} dataAvailable={!!user}/>
        );
    }

    return (
        <View style={styles.container}>
            <CommonHeader title="My Orders"/>
            <ScrollView style={styles.gridContainer}>
                {orders.length === 0 ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.emptyText}>You have no orders yet.</Text>
                    </View>
                ) : (
                    orders.map((order: Order) => (
                        <View key={order.id} style={styles.cardWrapper}>
                            <OrderCard order={order}/>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default Orders;