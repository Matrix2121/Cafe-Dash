import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: theme.spacing.md,
    padding: theme.spacing.lg,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.lg,
  },
  userInfoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 8,
  },
  rolesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 6,
  },
  rolesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999999",
    marginRight: 4,
  },
  role: {
    fontSize: 16,
    color: "#555555",
    marginRight: 6,
  },
  adminButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  adminButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  adminButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#5DBCD2",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    backgroundColor: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
