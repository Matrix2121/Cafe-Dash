import { ActivityIndicator, Text, View } from "react-native";
import styles from "./LoadingErrorView.style";
import React from "react";
import { theme } from "@/app/theme/theme";

interface Props {
    loading: boolean;
    error?: string | null | undefined;
    dataAvailable: boolean;
}

const LoadingErrorView = ({ loading, error, dataAvailable }: Props) => {
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator 
                    size="large" 
                    color={theme.colors.primary} 
                />
                <Text style={styles.loadingText}>
                    Loading cafe details...
                </Text>
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
                <Text style={styles.emptyText}>
                    No cafe data available.
                </Text>
            </View>
        );
    }
    return null;
}

export default LoadingErrorView;