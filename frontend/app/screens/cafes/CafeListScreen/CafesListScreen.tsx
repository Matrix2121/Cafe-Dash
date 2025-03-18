import React from "react";
import { View, ActivityIndicator, Text, FlatList } from "react-native";
import useCafesShort from "../../../hooks/useCafesShort";
import styles from "./CafesListScreen.style";
import { ScrollView } from "react-native-gesture-handler";
import CafeCard from "@/app/components/cafeCard/cafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";

const CafesListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePressCafe = (cafeId: number) => {
    navigation.navigate('CafeMenuScreen', { cafeId });
  };
  
  const { cafesShort, loading, error } = useCafesShort();

    const hasData = !!cafesShort && cafesShort.length > 0;

    if (loading || error || !hasData) {
        return <LoadingErrorView loading={loading} error={error} dataAvailable={hasData} />;
    }

  return (
    <FlatList
      data={cafesShort}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePressCafe(item.id)}>
          <CafeCard
            id={item.id}
            name={item.name}
            location={item.location}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        </Pressable>
      )}
    />
  );
};

export default CafesListScreen;
