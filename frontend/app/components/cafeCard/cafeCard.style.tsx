import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF", // Add a background color
    elevation: 3, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageStyle: {
    height: 150,
    resizeMode: "cover", // Ensure the image covers the area
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    marginTop: 4,
  },
  ratingStyle: {
    color: "#777", // Add a color for the rating text
    fontSize: 14,
  },
  whatToOfferStyle: {
    marginLeft: "auto", // Align to the right
    color: "#777", // Add a color for the "what to offer" text
    fontSize: 14,
  },
  topTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically
  },
});