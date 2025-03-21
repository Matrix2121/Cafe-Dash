import {ActivityIndicator, Text, View} from "react-native";
import styles from "@/app/screens/cafes/CafeListScreen/CafesList.style";
import React from "react";

interface Props {
    loading: boolean;
    error?: string | null | undefined;
    dataAvailable: boolean;
}

const LoadingErrorView: React.FunctionComponent<Props> = ({loading, error, dataAvailable}) => {
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#444444" />
                <Text>Loading cafe details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!dataAvailable) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No cafe data available.</Text>
            </View>
        );
    }
    return null;
}

export default LoadingErrorView