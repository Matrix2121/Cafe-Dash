import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/CafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "../../../hooks/useCafes";
import { Cafeteria } from "@/app/types/items";
import styles from "./CafesList.style";

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
        {cafes.map((cafe: Cafeteria) => (
          <View key={cafe.id} style={styles.cardWrapper}>
            <CafeCard cafe={cafe} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CafesList;