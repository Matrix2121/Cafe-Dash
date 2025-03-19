import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F8F9FA', // Matches provided background color
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333', // textPrimary color
      marginBottom: 16,
      textAlign: 'center',
    },
    formContainer: {
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
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default styles;