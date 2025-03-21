import React from "react";
import { FlatList, Pressable } from "react-native";
import useCafesShort from "../../../hooks/useCafesShort";
import CafeCard from "@/app/components/cafeCard/CafeCard";
import LoadingErrorView from "@/app/components/errorView/LoadingErrorView";
import { RootStackParamList } from '@/app/navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
