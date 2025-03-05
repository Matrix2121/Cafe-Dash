import React from 'react';
import { View, ActivityIndicator, Text, FlatList } from 'react-native';
import CafeCard from '../../../components/CafeCard/cafeCard';
import useCafes from '../../../hooks/useCafes';

const CafesListScreen = () => {
  const { cafes, loading, error } = useCafes();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={cafes}
        renderItem={({ item }) => (
          <CafeCard
            id={item.id}
            name={item.name}
            rating={item.rating}
            reviewCount={item.reviewCount}
            specialties={item.specialties}
          />
        )}
      />
    </View>
  );
};

export default CafesListScreen;