import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#FFFFFF',
    },
    price: {
      color: '#444444',
      fontSize: 16,
      alignSelf: 'center',
    },
    totalContainer: {
      borderTopWidth: 1,
      borderTopColor: '#CECECC',
      padding: 15,
      marginTop: 20,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#444444',
      textAlign: 'right',
    },
  });
export default styles;