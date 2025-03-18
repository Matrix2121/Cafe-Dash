import React from "react";
import { View, ActivityIndicator, Text, FlatList } from "react-native";
import useCafesShort from "../../../hooks/useCafes";
import styles from "./CafesListScreen.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import useCafes from "../../../hooks/useCafes";

const CafesListScreen = () => {
  const { cafes, loading, error } = useCafes();

    const hasData = !!cafes && cafes.length > 0;

    if (loading || error || !hasData) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
    }

  return (
    <ScrollView style={styles.mainContainer}>
        <View style={styles.gridContainer}>
            {cafes.map((item) => (
                <CafeCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    brand={item.brand}
                    location={item.location}
                    rating={item.rating}
                    phoneNumber={item.phoneNumber}
                    countReview={item.countReview}
                    openingHour={item.openingHour}
                    closingHour={item.closingHour}
                    isDeleted={item.isDeleted}
                />
            ))}
        </View>
    </ScrollView>
  );
};

export default CafesListScreen;
