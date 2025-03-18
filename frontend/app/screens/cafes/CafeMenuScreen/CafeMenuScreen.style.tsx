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
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444444', // primary color
    backgroundColor: '#CECECC', // secondary color
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemContainer: {
    flex: 2,
    marginRight: 16, // Space between items
  },
  itemList: {
    paddingHorizontal: 8,
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
});

export default styles;