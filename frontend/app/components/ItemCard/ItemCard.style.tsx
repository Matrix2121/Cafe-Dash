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
    width: '100%', // Make cards smaller to fit more on the screen
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
    textAlign: 'center', // Ensures text is horizontally centered
    marginBottom: 3,
  },
  name: {
    fontSize: 16, // Smaller font size
    fontWeight: 'bold',
    marginBottom: 4, // Smaller margin
    color: '#333333', // textPrimary
  },
  productType: {
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