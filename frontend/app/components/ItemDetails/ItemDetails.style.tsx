// src/components/ItemDetails/ItemDetails.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8, // Smaller padding
  },
  name: {
    fontSize: 16, // Smaller font size
    fontWeight: 'bold',
    marginBottom: 4, // Smaller margin
    color: '#333333', // textPrimary
  },
  category: {
    fontSize: 12, // Smaller font size
    color: '#777777', // textSecondary
    marginBottom: 8, // Smaller margin
  },
  description: {
    fontSize: 14, // Smaller font size
    color: '#444444', // primary
    marginBottom: 8, // Smaller margin
    lineHeight: 18, // Smaller line height
  },
  price: {
    fontSize: 16, // Smaller font size
    fontWeight: 'bold',
    color: '#444444', // primary
  },
});

export default styles;