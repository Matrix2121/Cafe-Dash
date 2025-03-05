// src/components/ItemImage/ItemImage.tsx
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import styles from './ItemImage.style';

type ItemImageProps = {
  imageUrl: string;
};

const ItemImage = ({ imageUrl }: ItemImageProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

export default ItemImage;