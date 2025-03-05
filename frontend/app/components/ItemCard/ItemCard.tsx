// src/components/ItemCard/ItemCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ItemDetails from '../ItemDetails/ItemDetails';
import { Item } from '../../types/item';
import styles from './ItemCard.style';

type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const handleAddToCart = async () => {
    try {
      // Add to cart logic here
      Alert.alert('Success', 'Item added to cart!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  return (
    <View style={styles.container}>
      {/* + Button in the upper-right corner */}
      <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Item Details */}
      <ItemDetails
        name={item.name}
        description={item.description}
        price={item.price}
        category={item.category}
      />
    </View>
  );
};

export default ItemCard;