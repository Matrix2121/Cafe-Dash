// src/components/ItemImage/ItemImage.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9, // Adjust based on your design
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F8F9FA', // background color
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default styles;