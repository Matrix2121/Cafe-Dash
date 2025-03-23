import React from "react";
import { View } from "react-native";
import styles from "./CafesListScreen.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "../../../hooks/useCafes";
import { Cafe } from "@/app/types/items";

const CafesListScreen = () => {
  const { cafes, loading, error } = useCafes();

  const hasData = !!cafes && cafes.length > 0;

  if (loading || error || !hasData) {
    return (
      <LoadingErrorView
        loading={loading}
        error={error}
        dataAvailable={hasData}
      />
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

export default CafesListScreen;
