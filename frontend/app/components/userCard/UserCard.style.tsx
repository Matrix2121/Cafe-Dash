import { StyleSheet } from "react-native";
import { theme } from "@/app/theme/theme";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: theme.spacing.md,
    padding: theme.spacing.lg,         
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    width: "60%",
    minHeight: 180,
    alignSelf: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  userInfoContainer: {
    flex: 1,
  },
  adminButtonContainer: {
    flexDirection: "row",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: "#777777",
    marginBottom: 8,
  },
  rolesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  rolesLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999999",
    marginRight: 8,
  },
  role: {
    fontSize: 18,
    color: "#555555",
    marginRight: 4,
  },

  bottomButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: theme.spacing.md,
  },
  
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 8,
    marginVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  /**
   * ADMIN BUTTONS (Edit, Delete)
   */
  adminButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    marginVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  adminButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  editButton: {
    backgroundColor: "#87CEEB",
  },
  deleteButton: {
    backgroundColor: "#FF6961",
  },
});

export default styles;
