// src/components/AddToCartButton/AddToCartButton.tsx
import React from 'react';
import { Button } from 'react-native-paper';
import styles from './AddToCartButton.style';

type AddToCartButtonProps = {
  onPress: () => void;
  isLoading: boolean;
};

const AddToCartButton = ({ onPress, isLoading }: AddToCartButtonProps) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={isLoading}
      disabled={isLoading}
      style={styles.button}
      labelStyle={styles.buttonText}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;