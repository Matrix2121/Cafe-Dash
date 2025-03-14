import React from "react";
import { View, ActivityIndicator, Text, FlatList } from "react-native";
import useCafesShort from "../../../hooks/useCafesShort";
import styles from "./CafesListScreen.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

const CafesListScreen = () => {
  const { cafesShort, loading, error } = useCafesShort();

    const hasData = !!cafesShort && cafesShort.length > 0;

    if (loading || error || !hasData) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
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
