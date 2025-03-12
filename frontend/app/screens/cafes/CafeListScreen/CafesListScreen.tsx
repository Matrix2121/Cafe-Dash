import React from "react";
import { View, ActivityIndicator, Text, FlatList } from "react-native";
import useCafesShort from "../../../hooks/useCafesShort";
import styles from "./CafesListScreen.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";

const CafesListScreen = () => {
  const { cafesShort, loading, error } = useCafesShort();

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

  if (!cafesShort) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No cafe data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <FlatList
          data={cafesShort}
          renderItem={({ item }) => (
            <CafeCard
              id={item.id}
              name={item.name}
              location={item.location}
              rating={item.rating}
              reviewCount={item.reviewCount}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CafesListScreen;
