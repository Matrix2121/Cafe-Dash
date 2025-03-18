import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly", // или "flex-start" ако искаш по-плътно
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
