import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA', // background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // textPrimary
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#FFFFFF', // surface color
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444444', // primary
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // background color
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // background color
  },
  errorText: {
    fontSize: 16,
    color: '#777777', // textSecondary
  },
  itemContainer: {
    marginBottom: 16,
  },
  label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#555',
  },
  value: {
      fontSize: 16,
      color: '#000',
  },
  headerImage: {
    width: '100%',        // Full width of container
    height: 200,          // Fixed height for consistency
    borderRadius: 8,      // Match your card border radius
    marginBottom: 16,     // Space between image and content
    backgroundColor: '#CECECC', // Secondary color for loading state
    shadowColor: '#000',  // Shadow to match your card style
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,         // Android shadow
  },
});

export default styles;