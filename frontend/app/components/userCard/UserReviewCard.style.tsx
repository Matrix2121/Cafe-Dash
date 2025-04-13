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
    width: "90%",
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

  reviewInfoContainer: {
    flex: 1,
  },

  reviewTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },

  reviewBody: {
    fontSize: 16,
    color: "#555555",
    marginBottom: theme.spacing.sm,
  },

  reviewRating: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  adminButtonContainer: {
    flexDirection: "row",
  },

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
    fontSize: 16,
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
