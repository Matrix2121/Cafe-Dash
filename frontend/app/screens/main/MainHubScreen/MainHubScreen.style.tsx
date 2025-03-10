import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#CECECC',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      marginLeft: 5,
      color: '#444444',
      fontSize: 16,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#444444',
    },
    tabBar: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#CECECC',
      height: 60,
      paddingBottom: 5,
    },
  });

  export default styles;