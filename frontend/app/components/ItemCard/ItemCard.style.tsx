// src/components/ItemCard/ItemCard.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // surface color
    borderRadius: 10,
    margin: 8, // Smaller margin
    padding: 12, // Smaller padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
    width: '48%', // Make cards smaller to fit more on the screen
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#444444', // primary color
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the button is above other content
  },
  addButtonText: {
    color: '#FFFFFF', // surface (white text)
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;