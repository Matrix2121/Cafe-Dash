// src/screens/cafes/CafeMenuScreen/CafeMenuScreen.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ItemCard from '../../../components/ItemCard/ItemCard';
import styles from './CafeMenuScreen.style';

// Mock data for the cafe menu (without images)
const mockMenuItems = [
  {
    id: 1,
    name: 'Espresso',
    description: 'A strong black coffee made by forcing steam through ground coffee beans.',
    price: 3.5,
    category: 'Coffee',
  },
  {
    id: 2,
    name: 'Latte',
    description: 'A creamy coffee made with espresso and steamed milk.',
    price: 4.5,
    category: 'Coffee',
  },
  {
    id: 3,
    name: 'Cappuccino',
    description: 'A classic Italian coffee with equal parts espresso, steamed milk, and foam.',
    price: 4.0,
    category: 'Coffee',
  },
  {
    id: 4,
    name: 'Croissant',
    description: 'A buttery, flaky pastry perfect with coffee.',
    price: 2.5,
    category: 'Pastry',
  },
  {
    id: 5,
    name: 'Croissant',
    description: 'A buttery, flaky pastry perfect with coffee.',
    price: 2.5,
    category: 'Pastry',
  },
];

const CafeMenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cafe Menu</Text>
      <FlatList
        data={mockMenuItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 items per row
        renderItem={({ item }) => <ItemCard item={item} />}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default CafeMenuScreen;