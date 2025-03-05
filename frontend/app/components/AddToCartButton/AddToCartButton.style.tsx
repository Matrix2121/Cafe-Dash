// src/components/AddToCartButton/AddToCartButton.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#444444', // primary
  },
  buttonText: {
    color: '#FFFFFF', // surface (white text on primary background)
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;