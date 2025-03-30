import React from "react";
import { ActivityIndicator, Text, View} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "./LoadingErrorView.style";
import { theme } from "@/app/theme/theme";

interface Props {
  loading: boolean;
  error?: string | null | undefined;
  dataAvailable: boolean;
}

const LoadingErrorView = ({ loading, error, dataAvailable }: Props) => {
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading cafe details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
              mode="contained"
              onPress={navigation.goBack}
              style={styles.goBackButton}
            >
              Go Back
          </Button>
      </View>
    );
  }

  if (!dataAvailable) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No data available.</Text>
        <Button
              mode="contained"
              onPress={navigation.goBack}
              style={styles.goBackButton}
            >
              Go Back
          </Button>
      </View>
    );
  }
  
  return null;
};

export default LoadingErrorView;
