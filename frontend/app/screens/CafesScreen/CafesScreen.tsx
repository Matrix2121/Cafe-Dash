// CafeScreen.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CafeCard from '../../components/cafeCard/cafeCard';
import styles from './CafesScreen.styles';

const cafes = [
  {
    id: '1',
    name: 'The Coffee House',
    distance: 0.5,
    rating: 4.8,
    image: 'https://example.com/coffee1.jpg',
  },
];

const CafeScreen = () => {
  return (
    <FlatList
      data={cafes}
      renderItem={({ item }) => <CafeCard cafeName={'zad ftori'} cafeRating={'5.0(23)'} whatToOffer={'Coffee, Sandwiches'} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default CafeScreen;