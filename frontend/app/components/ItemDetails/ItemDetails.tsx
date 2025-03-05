// src/components/ItemDetails/ItemDetails.tsx
import React from 'react';
import { Text, View } from 'react-native';
import styles from './ItemDetails.style';

type ItemDetailsProps = {
  name: string;
  description: string;
  price: number;
  category: string;
};

const ItemDetails = ({ name, description, price, category }: ItemDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </View>
  );
};

export default ItemDetails;