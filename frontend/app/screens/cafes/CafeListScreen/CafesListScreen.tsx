import React from 'react';
import { RootStackParamList } from '@/app/navigation/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FlatList, View } from 'react-native';
import CafeCard from '../../../components/CafeCard/CafeCard';

  const cafes = [
    { id: 1, cafeName: "Zad ftori", cafeRating: "5.0 (23)", whatToOffer: "Coffee, Sandwiches" },
    { id: 2, cafeName: "Coffee Corner", cafeRating: "4.5 (15)", whatToOffer: "Coffee, Pastries" },
  ];

const CafeScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPress = (id: number) => {
    navigation.navigate('CafesListScreen');
  };

  return (
    <View>
      <FlatList
        data={cafes}
        renderItem={({ item }) => (
          <CafeCard
            id={item.id}
            cafeName={item.cafeName}
            cafeRating={item.cafeRating}
            whatToOffer={item.whatToOffer}
            onPress={onPress}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CafeScreen;