import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Item } from '../../types/items';
import styles from './ItemCard.style';

type ItemCardProps = {
  item: Item;
};

const ItemCard = ( {item} : ItemCardProps) => {
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
      <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
};

export default ItemCard;