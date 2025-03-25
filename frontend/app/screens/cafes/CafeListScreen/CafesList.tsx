import React from "react";
import { View, ActivityIndicator, Text, FlatList } from "react-native";
import styles from "./CafesList.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "../../../hooks/useCafes";
import { Cafe } from "@/app/types/items";

const CafesList = () => {
  const { cafes, loading, error } = useCafes();

  const hasData = Array.isArray(cafes) && cafes.length > 0;

  if (loading || error || !hasData) {
    return (
      <View style={styles.loadingErrorContainer}>
        <LoadingErrorView
          loading={loading}
          error={error}
          dataAvailable={hasData}
        />
      </View>
    );
  }


  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.gridContainer}>
        {cafes.map((cafe: Cafe) => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CafesList;
